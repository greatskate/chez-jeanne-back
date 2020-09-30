const { Model } = require('noktjs');
const { RoomTemplate } = require('./rooms');

const BookingTemplate = {
    nameModel: 'Booking',
    room: Model.foreignKey(RoomTemplate),
    price: Model.float(),
    dayStart: Model.date(),
    dayEnd: Model.date(),
    email: Model.charfield(100),
    name: Model.charfield(100),
    reference: Model.charfield(10)
}

module.exports.BookingTemplate = BookingTemplate;