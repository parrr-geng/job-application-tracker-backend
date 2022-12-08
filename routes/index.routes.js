const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

/*
router.get("/dashboard", (req, res, next)=>{
  res.json("Welcome to the dashboard")
});
*/

module.exports = router;
