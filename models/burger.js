const orm = require("../config/orm");


// Calls the ORM functions using specific input to ORM

var burger = {
    // Select all burger table entries
    selectAll: function (cb) {
        orm.selectAll('burgers', function (res) {
            cb(res);
        });
    },

    // Insert new table entry
    insertOne: function (cols, vals, cb) {
        orm.insertOne('burgers', cols, vals, function (res) {
            cb(res);
        });
    },
    // Update the table entry
    updateOne: function (objColVals, condition, cb) {
        orm.updateOne('burgers', objColVals, condition, function (res) {
            cb(res);
        });
    }
};

// Export file

module.exports = burger;