// Import the ORM to create functions that will interact with the database.
const orm = require(`../config/orm.js`);

const burger = {
  selectAll: function(cb) {
    orm.selectAll(`burgers`, res => {
      cb(res)
    })
  },
  selectAllByDate: function(type, cb) {
    orm.selectAllByDate(`burgers`, type, res => {
      cb(res)
    })
  },
  // The variables cols and vals are arrays.
  insertOne: (cols, vals, cb) => {
    orm.insertOne(`burgers`, cols, vals, res => {
      cb(res)
    })
  },
  updateOne: (objColVals, condition, cb) => {
    orm.updateOne(`burgers`, objColVals, condition, res => cb(res) )
  },
  delete: (id , cb) => {
    orm.delete(`burgers`, id, res =>  cb(res) )
  }
};

// Export the database functions for the controller (controllers/burgers/controller.js).
module.exports = burger;
