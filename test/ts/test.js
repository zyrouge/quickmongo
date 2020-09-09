"use strict";
exports.__esModule = true;
var quickmongo = require("../../index");
var db = new quickmongo.Database("mongodb://localhost/test");
db.on("ready", function () {
    console.log("Hey, im connected!");
});
db.on("error", console.error);
db.on("debug", console.log);
db.valueArray().then(console.log);
