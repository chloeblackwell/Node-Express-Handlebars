const express = require("express");
const burger = require("../models/burger.js");
var router = express.Router();

// Create router for the app 
router.get("/", function (req, res) {
    res.redirect("/home");
});

// Home page 
router.get("/home", function (req, res) {
    burger.selectAll(function (data) {
        var hbsObject = {
            burgers: data
        };
        console.log(hbsObject);
        res.render("index", hbsObject);
    });
});

// New route for new burger
router.post("/burger/new", function (req, res) {
    burger.insertOne(req.body.burger_name, function () {
        // Redirects to home page 
        res.redirect("/home")
    })
});

// Route for devoured burgers
router.post("/burger/devour/:id", function (req, res) {
    burger.updateOne(req.params.id, function () {
        // Redirects to home page
        res.redirect("/home");
    });
});

// Export router 

module.exports = router;