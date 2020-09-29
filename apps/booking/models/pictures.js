const { Model } = require('noktjs');
const { RoomTemplate } = require('./rooms');

const PictureTemplate = {
    nameModel:'Picture',
    description: Model.text(),
    url: Model.charfield(100),
    room: Model.foreignKey(RoomTemplate)
}

module.exports.PictureTemplate = PictureTemplate;