//try {

    // Import security and authentication route utilities.  
    const passwordgen = require('../middleware/password-gen')
    const auth = require('./auth')

    // Import data routes.
    const user = require('./user')
    const alert = require('./alert')
    const day = require('./day')
  
    module.exports = app => {

        // Security and authentication route utilities.
        app.use('/api/auth', auth)
        app.use('/api/passwordgen', passwordgen)

        // Data routes.
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