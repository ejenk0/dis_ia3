import { open } from "sqlite";

var sqlite3 = require("sqlite3").verbose();
var db = open({ filename: "db/api_db.sqlite", driver: sqlite3.Database });
// var db = new sqlite3.Database("db/api_db.sqlite");
export default db;
