//try {

    var qs = require('qs')

    //Call queries files and api routes.  
    const user = require('./user')
    const alert = require('./alert')
    const day = require('./day')
  
    //User queries.
    module.exports = app => {

        app.use('/api/user', user)
        app.use('/api/alert', alert)
        app.use('/api/day', day)
    }

    



/*
} catch (e) {
  
    app.get('/', function (req, res) {
      res.send('An error occurred with the default router.<hr/>' + e);
    });
  
}*/