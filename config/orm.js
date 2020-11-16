var connection = require("./connection");

// Helper functions for My SQL syntax 
function printQuestionMarks(num) {
    var arr = [];

    for (var i = 0; i < num; i++) {
        arr.push("?");
    }

    return arr.toString();
}

function objToSql(ob) {
    var arr = [];

    for (var key in ob) {
        arr.push(key + "=" + ob[key]);
    }

    return arr.toString();
}

// Object for all SQL statements 
var orm = {
    // Function that returns all table entries
    selectAll: function (tableInput, cb) {
        // Construct query string
        var query = "SELECT * FROM " + tableInput + ";";

        // Database query
        connection.query(query, function (err, result) {
            if (err) {
                throw err;
            }
            // Return results in callback
            cb(result);
        });
    },

    // Function to insert a table entry 
    insertOne: function (table, cols, vals, cb) {
        // Constructs the query
        var query = "INSERT INTO " + table;

        query += " (";
        query += cols.toString();
        query += ") ";
        query += "VALUES (";
        query += printQuestionMarks(vals.length);
        query += ") ";

        // Database query
        connection.query(query, vals, function (err, result) {
            if (err) {
                throw err;
            }
            // Return results in callback
            cb(result);
        });
    },

    // Function that updates table entry 
    updateOne: function (table, objColVals, condition, cb) {
        // Constructs the query
        var query = "UPDATE " + table;

        query += " SET ";
        query += objToSql(objColVals);
        query += " WHERE ";
        query += condition;

        // Database query
        connection.query(query, function (err, result) {
            if (err) {
                throw err;
            }
            // Return results in callback
            cb(result);
        });
    }
};

// Export the file 
module.exports = orm;