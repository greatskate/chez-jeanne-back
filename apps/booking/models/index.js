const { createModel } = require('noktjs');
const { BookingTemplate } = require('./bookings');
const { PictureTemplate } = require('./pictures');
const { PriceTemplate } = require('./price');
const { RoomTemplate } = require('./rooms');
/* Model Import Start */

const { Room, RoomModel } = require('./build/room');
const { Price, PriceModel } = require('./build/price');
const { Booking, BookingModel } = require('./build/booking');
const { Picture, PictureModel } = require('./build/picture');
/* Model Import End */

const create = async () =>{
  process.chdir(__dirname);
  await createModel(RoomTemplate);
  await createModel(PriceTemplate);
  await createModel(BookingTemplate);
  await createModel(PictureTemplate);
}
const sync = () => new Promise((succes, fail) => {
    RoomModel.createTable().then(()=>{
    PriceModel.createTable().then(()=>{
    BookingModel.createTable().then(()=>{
    PictureModel.createTable().then(()=>{
    /* Create Table */
    })})})})
  });
module.exports.sync = sync;
module.exports.createModels = create;
module.exports.Room = Room;
module.exports.RoomModel = RoomModel;


module.exports.Price = Price;
module.exports.PriceModel = PriceModel;


module.exports.Booking = Booking;
module.exports.BookingModel = BookingModel;


module.exports.Picture = Picture;
module.exports.PictureModel = PictureModel;

