const Handler = require('./handlers');
const { builder } = require('./main');
/* IMPORT REST HANDLERS */
/* END REST HANDLERS */

builder();
const routes = (router, middleware) => {
    router.get('/booking/',(req,res) => {
        res.send('booking routes Works !')
    })
    /* REST ROUTES */
    /* END REST ROUTES */
};

module.exports.routes = routes;