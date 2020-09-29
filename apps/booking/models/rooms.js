const { Model } = require('noktjs');

const RoomTemplate = {
    nameModel:'Room',
    name: Model.charfield(40),
    description: Model.text()
}

module.exports.RoomTemplate = RoomTemplate;