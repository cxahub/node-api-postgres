// Create a new express-promise-router this has the same API as the normal express router except
// it allows you to use async functions as route handlers.

const Router = require('express-promise-router');
const db = require('../db');
let cacheid = 'alert';
let paramid = '';
const tableName = 'cxahub.t_alert';
//const viewName = 'cxahub.v_alert';

const router = new Router();

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
router.get('/', chkCache.verifyCache, async (req, res) => {

    try {
  
      const { rows } = await db.query(`SELECT * FROM ${tableName}`)
      chkCache.cache.set(cacheid, rows);
      res.send(rows)
  
    } catch ({ response }) {
  
      return res.sendStatus(response.status);
  
    }
  
  })
  
  // Get by id.
  router.get('/:id', chkCache.verifyCache, async (req, res) => {
  
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
router.post('/', async (req, res) => {
    const { a_name, a_description } = request.body
    const { rows } = await db.query(`INSERT INTO ${tableName} (a_name, a_description ) VALUES ($1, $2) RETURNING *`, [a_name, a_description])
    res.send(`Alert added with ID: ${results.rows[0].id}`)
})

// Update record.
router.put('/:id', async (req, res) => {
    const id = parseInt(request.params.id)
    const { a_name, a_description} = request.body
    const { rows } = await db.query(`UPDATE ${tableName} SET a_name = $1, a_description = $2 WHERE id = $3`, [a_name, a_description])
    res.send(`Alert modified with ID: ${id}`)
})

// Delete record.
router.delete('/:id', async (req, res) => {
    const id = parseInt(request.params.id)
    const { rows } = await db.query(`DELETE FROM ${tableName} WHERE id = $1`, [id])
    res.send(`Alert deleted with ID: ${id}`)
})