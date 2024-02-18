const formidable = require("formidable");
const fs = require("fs");

const Shop = require("../models/shop.model.js");
const errorHandler = require("../helpers/dbErrorHandler.js");

const create = async (req, res) => {
  const form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, async (err, fields, files) => {
    if (err) {
      res.status(400).json({
        message: "Image could not be uploaded",
      });
    }
    if (!fields.name || !fields.name[0]) {
      return res.status(400).json({
        error: "Name is required"
      })
    }
    const shop = new Shop();
    shop.owner = req.profile;
    if (files.image) {
      shop.image.data = fs.readFileSync(files.image[0].filepath);
      shop.image.contentType = files.image[0].mimetype;
    }
      shop.name = fields.name[0];
      shop.description = fields.description[0];

    try {
      await shop.save();

      return res.status(200);
    } catch (error) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(error)
      })
    }
  });
};

// returns all the shops in the database
const list = async (req, res) => {
  try {
    let shops = await Shop.find();
    return res.json(shops);
  } catch (error) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(error),
    });
  }
};

module.exports = { create, list };
