const { Model } = require('noktjs');
const { RoomTemplate } = require('./rooms');

const BookingTemplate = {
    nameModel: 'Booking',
    room: Model.foreignKey(RoomTemplate),
    price: Model.float(),
    day: Model.date(),
    booked: Model.boolean(),
    by: Model.charfield(100)
}

module.exports.BookingTemplate = BookingTemplate;