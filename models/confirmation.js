// Import the ORM to create functions that will interact with the database.
const orm = require(`../config/orm.js`);

const confirmation = {
  selectAll: function(cb) {
    orm.selectAll(`confirmations`, res => {
      cb(res)
    })
  },
  updateOne: (objColVals, condition, cb) => {
    orm.updateOne(`confirmations`, objColVals, condition, res => cb(res) )
  },
};

// Export the database functions for the controller (controllers/confirmations/controller.js).
module.exports = confirmation;
