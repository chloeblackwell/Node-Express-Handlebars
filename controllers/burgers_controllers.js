const express = require("express");
const burger = require("../models/burger.js");
var router = express.Router();

// Create router for the app 
router.get("/", function (req, res) {
    res.redirect("/home");
});

// Home page 
router.get('/home', function (req, res) {
    burger.selectAll(function (data) {
        var hbsObject = {
            burgers: data
        };
        res.render('index', hbsObject);
    });
});
// Create new burger 
router.post('/burger/new', function (req, res) {
    burger.insertOne([
        'burger_name'
    ], [
        req.body.burger_name
    ], function () {
        res.redirect('/home');
    });
});
// Moves devoured burgers
router.post('/burger/devour/:id', function (req, res) {
    var condition = 'id = ' + req.params.id;

    burger.updateOne({
        devoured: true
    }, condition, function () {
        res.redirect('/home');
    });
});

// Export router 

module.exports = router;