require('dotenv').config();
const { createHandler } = require('noktjs');
const { createRoutes } = require('noktjs/managers/route');
const { BookingTemplate } = require('../models/bookings');
const { PictureTemplate } = require('../models/pictures');
const { RoomTemplate } = require('../models/rooms');
/* Handlers Import Start */

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
}
module.exports.createRestHandlers = create;
/* Export REST */