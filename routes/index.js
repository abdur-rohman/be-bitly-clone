var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
  res.json({
    author: "Abdur Rohman",
    github: "https://github.com/abdur-rohman2883"
  })
});

module.exports = router;