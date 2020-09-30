const Handler = require('./handlers');
const { builder } = require('./main');
/* IMPORT REST HANDLERS */
const { RoomRestHandlers } = require('./handlers');
const { PictureRestHandlers } = require('./handlers');
const { BookingRestHandlers } = require('./handlers');
const { PriceRestHandlers } = require('./handlers');
/* END REST HANDLERS */

builder();
const routes = (router, middleware) => {
    router.get('/booking/',(req,res) => {
        res.send('booking routes Works !')
    })
    /* REST ROUTES */
    router.get('/booking/rooms/', RoomRestHandlers.get);
    router.get('/booking/rooms/:id', RoomRestHandlers.getOne);
    router.put('/booking/rooms/:id', RoomRestHandlers.put);
    router.post('/booking/rooms/', RoomRestHandlers.post);
    router.delete('/booking/rooms/:id', RoomRestHandlers.delete);
    router.get('/booking/pictures/', PictureRestHandlers.get);
    router.get('/booking/pictures/:id', PictureRestHandlers.getOne);
    router.put('/booking/pictures/:id', PictureRestHandlers.put);
    router.post('/booking/pictures/', PictureRestHandlers.post);
    router.delete('/booking/pictures/:id', PictureRestHandlers.delete);
    router.get('/booking/bookings/', BookingRestHandlers.get);
    router.get('/booking/bookings/:id', BookingRestHandlers.getOne);
    router.put('/booking/bookings/:id', BookingRestHandlers.put);
    router.post('/booking/bookings/', BookingRestHandlers.post);
    router.delete('/booking/bookings/:id', BookingRestHandlers.delete);
    router.get('/booking/prices/', PriceRestHandlers.get);
    router.get('/booking/prices/:id', PriceRestHandlers.getOne);
    router.put('/booking/prices/:id', PriceRestHandlers.put);
    router.post('/booking/prices/', PriceRestHandlers.post);
    router.delete('/booking/prices/:id', PriceRestHandlers.delete);
    /* END REST ROUTES */
};

module.exports.routes = routes;