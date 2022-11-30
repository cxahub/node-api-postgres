// Create a new express-promise-router this has the same API as the normal express router except
// it allows you to use async functions as route handlers.

const Router = require('express-promise-router');
const db = require('../db');
const auth = require("../middleware/auth");
const { admin, service, viewer } = require("../middleware/roles");
let cacheid = 'alert';
let paramid = '';
const tableName = 'cxahub.t_alert';
const viewName = 'cxahub.v_alert';
const bodyParser = require('body-parser')
const router = new Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// Export our router to be mounted by the parent application
module.exports = router;

//Check the cache.
let chkCache = require('../cache')(cacheid+paramid);

//Get the current id for cacheid.
router.get('/:id', function(req, res, next) {
    paramid = req.params.id;
    //Check the cache.
    chkCache = require('../cache')(cacheid+paramid);
    next();
  });

//Get all records.
router.get('/', [auth, service], chkCache.verifyCache, async (req, res) => {

    try {
  
      const { rows } = await db.query(`SELECT * FROM ${tableName}`)
      chkCache.cache.set(cacheid, rows);
      res.send(rows)
  
    } catch ({ response }) {
  
      return res.sendStatus(response.status);
  
    }
  
  })
  
  // Get by id.
  router.get('/:id', [auth, service], chkCache.verifyCache, async (req, res) => {
  
    try {
      
      const { id } = req.params 
      const { rows } = await db.query(`SELECT * FROM ${tableName} WHERE id = $1`, [id])
      chkCache.cache.set(cacheid+id, rows);
      res.send(rows[0])
  
    } catch ({ response }) {
  
      return res.sendStatus(response.status);
  
    }
  
  })

// Create record.
router.post('/', [auth, service], async (req, res) => {

  try {

    const { a_name, a_description, a_date_rel, a_date_exp, at_id, ap_id } = req.body
    const { rows } = await db.query(`INSERT INTO ${tableName} (a_name, a_description, a_date_rel, a_date_exp, at_id, ap_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`, [a_name, a_description, a_date_rel, a_date_exp, at_id, ap_id])
    res.send(`Alert added with ID: ${rows[0].id}`)

  } catch (error) {

      res.send('An error occurred creating the record.' + error);

  }
  
})

// Update record.
router.put('/:id', [auth, service], async (req, res) => {
    const id = parseInt(request.params.id)
    const { a_name, a_description} = request.body
    const { rows } = await db.query(`UPDATE ${tableName} SET a_name = $1, a_description = $2 WHERE id = $3`, [a_name, a_description])
    res.send(`Alert modified with ID: ${id}`)
})

// Delete record.
router.delete('/:id', [auth, service], async (req, res) => {
    const id = parseInt(request.params.id)
    const { rows } = await db.query(`DELETE FROM ${tableName} WHERE id = $1`, [id])
    res.send(`Alert deleted with ID: ${id}`)
})