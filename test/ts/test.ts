import * as quickmongo from "../../index";

const db = new quickmongo.Database("mongodb://localhost/test");

db.on("ready", () => {
    console.log("Hey, im connected!");
});

db.on("error", console.error);
db.on("debug", console.log);

db.valueArray().then(console.log);