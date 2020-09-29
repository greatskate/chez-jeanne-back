/* Import Models */
const BookingModels = require('./apps/booking/models');
/* End Import Models */

module.exports.create = () => new Promise((succes, fail) => {
    BookingModels.sync().then(
    ()=>{
        /* AUTOMATIC SYNC */
    }
);
});