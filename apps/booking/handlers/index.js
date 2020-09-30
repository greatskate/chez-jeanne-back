require('dotenv').config();
const { createHandler } = require('noktjs');
const { createRoutes } = require('noktjs/managers/route');
const { BookingTemplate } = require('../models/bookings');
const { PictureTemplate } = require('../models/pictures');
const { PriceTemplate } = require('../models/price');
const { RoomTemplate } = require('../models/rooms');
/* Handlers Import Start */
const { RoomRestHandlers } = require('./build/room');
const { PictureRestHandlers } = require('./build/picture');
const { BookingRestHandlers } = require('./build/booking');
const { PriceRestHandlers } = require('./build/price');
/* Handlers Import End */


const create = async () =>{
    process.chdir(__dirname);
    await createHandler(RoomTemplate).then(async ()=>{
        await createRoutes(RoomTemplate);
    });
    await createHandler(PictureTemplate).then(async () => {
        await createRoutes(PictureTemplate);
    });
    await createHandler(BookingTemplate).then(async () => {
        await createRoutes(BookingTemplate);
    });
    await createHandler(PriceTemplate).then(async () => {
        await createRoutes(PriceTemplate);
    });
}
module.exports.createRestHandlers = create;
module.exports.RoomRestHandlers = RoomRestHandlers
module.exports.PictureRestHandlers = PictureRestHandlers
module.exports.BookingRestHandlers = BookingRestHandlers
module.exports.PriceRestHandlers = PriceRestHandlers
/* Export REST */