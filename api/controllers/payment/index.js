const express = require("express");
const router = express.Router();
const ccav = require("./../../config/ccavutil");

router.post("/post", (req, res, next) => {
  var body = req.body;

  var obj = "";

  for (var key in body) {
    //formData.append(key, body[key]);
    obj=obj+key+"="+body[key]+"&";

  }

  var workingKey = "XXX";
  var encRequest = ccav.encrypt(obj, workingKey);
  try {
    console.log(body);
    res.json(encRequest);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
