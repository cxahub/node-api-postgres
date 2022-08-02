const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 15 });
 
module.exports = function(cacheid, paramid) {

    var module = {};
    module.verifyCache = (req, res, next) => {

        try {
    
            if (cache.has(cacheid + paramid)) {

                return res.status(200).json(cache.get(cacheid + paramid));

            }

            return next();
    
        } catch (err) {
    
            throw new Error(err);
    
        }
    
    };

    module.cache = cache;

    return module;
};