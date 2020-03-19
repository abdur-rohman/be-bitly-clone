var express = require("express");
var router = express.Router();
const ip = require("ip");
const Sequelize = require("sequelize");
const { authorization } = require("../middlewares/token");
const { randomString } = require("../helper/util");
const { user, short_url, track } = require("../models/index");

router.post("/", async (req, res) => {
  const url = req.body;

  try {
    if (req.headers.authorization) {
      const auth = await user.findOne({ token: req.headers.authorization });

      url.user_id = auth.id;
    }

    if (!url.short_url) url.short_url = randomString();

    await short_url.create(url);

    res.json({
      status: true,
      message: "Successful",
      data: url
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error
    });
  }
});

router.get("/", authorization, async (req, res) => {
  try {
    const auth = req.auth;

    const data = await short_url.findAll({
      where: { user_id: auth.id },
      attributes: {
        include: [[Sequelize.fn("COUNT", Sequelize.col("tracks.id")), "clicks"]]
      },
      include: [{ model: track, attributes: [] }],
      group: ["short_url.id"]
    });

    res.json({
      status: true,
      message: "Successful",
      data
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error
    });
  }
});

router.get("/:short_url", async (req, res) => {
  try {
    const url = await short_url.findOne({
      where: { short_url: req.params.short_url }
    });

    console.log(url);

    if (url.short_url) {
      await track.create({
        short_url_id: url.id,
        ip_address: ip.address(),
        referrer_url: url.url
      });

      res.redirect(url.url);
    } else {
      res.status(400).json({
        status: false,
        message: "Oops short url not found"
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error
    });
  }
});

module.exports = router;
