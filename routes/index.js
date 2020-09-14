const express = require("express");
const router = express.Router();
import { promises } from "fs";
import path from "path";

/* GET home page. */
router.get("/", async function (req, res, next) {
  const files = await promises.readdir(path.resolve("./documents"));
  files.forEach(function (file) {
    // Do whatever you want to do with the file
    console.log(file);
  });

  res.render("index", { title: "Express", files });
});

module.exports = router;
