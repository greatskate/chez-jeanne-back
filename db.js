/* Import Models */
const AuthentificationModels = require('./apps/authentification/models');
const BookingModels = require('./apps/booking/models');
/* End Import Models */

module.exports.create = () => new Promise((succes, fail) => {
    AuthentificationModels.sync().then(()=>{
        BookingModels.sync().then(
            ()=>{
                /* AUTOMATIC SYNC */
            });
    })
});