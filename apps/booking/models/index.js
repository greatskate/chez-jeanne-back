const { createModel } = require('noktjs');
const { BookingTemplate } = require('./bookings');
const { PictureTemplate } = require('./pictures');
const { RoomTemplate } = require('./rooms');
/* Model Import Start */

/* Model Import End */

const create = async () =>{
  process.chdir(__dirname);
  await createModel(RoomTemplate);
  await createModel(BookingTemplate);
  await createModel(PictureTemplate);
}
const sync = () => new Promise((succes, fail) => {
    /* Create Table */
  });
module.exports.sync = sync;
module.exports.createModels = create;