// Create a new express-promise-router this has the same API as the normal express router except
// it allows you to use async functions as route handlers.

const Router = require('express-promise-router');
const db = require('../db');
let cacheid = 'day';
let paramid = '';
const tableName = 'cxahub.t_day';
//const viewName = 'cxahub.v_day';

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