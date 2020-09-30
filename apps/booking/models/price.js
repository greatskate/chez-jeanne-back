const { Model } = require('noktjs');
const { RoomTemplate } = require('./rooms');

const PriceTemplate = {
    nameModel:'Price',
    room: Model.foreignKey(RoomTemplate),
    day: Model.date(),
    price: Model.float()
}

module.exports.PriceTemplate = PriceTemplate;