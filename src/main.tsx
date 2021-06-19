import { DB } from "./db";

DB.load().then((db) => {
  console.log("Database loaded", db);
});
