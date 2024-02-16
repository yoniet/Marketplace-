const User = require('../models/user.model.js');
const extend = require('lodash/extend.js');
const errorHandler = require('../helpers/dbErrorHandler.js');

/**
 * Create new user with the user JSON object 
 * that's received in the POST request from the forntend within req.body.
 */
const create = async (req, res) => {
    console.log('In the function create onto user.model: ' + req.body.name, req.body.email)
    const user = new User(req.body)
    try {
        // attempts to save the new user in the database after Mongoose has 
        // performed a validation check on the data.
        await user.save()
        return res.status(200).json({
            message: "Successfully sined up!"
        });
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    }
};

const userByID = async (req, res, next, id) => {
    try {
      let user = await User.findById(id)
      if (!user)
        return res.status('400').json({
          error: "User not found"
        })
      req.profile = user
      next()
    } catch (err) {
      return res.status('400').json({
        error: "Could not retrieve user"
      })
    }
  }

  /**
   * read function retrieves the user details from userByID "req.profile"
   * and remove sensitive information, such as the hashed_passord and salt value,
   * before sending the user onject in the response to the requesting client
   * 
   */
  const read = (req, res) => {
    req.profile.hashed_password = undefined
    req.profile.salt = undefined
    return res.json(req.profile)
  }

  /**
   * update function retrieves the user details from userByID "req.profile"
   * and then uses the "lodash extend" module to extend and merge the changes that came
   * in the request body to update the user data
   *
   */
  const update = async (req, res) => {
    try {
      let user = req.profile;
      user = extend(user, req.body);
      user.updated = Date.now();
      await user.save();
      // remove sensitive information, such as the hashed_passord and salt value,
      // before sending the user onject in the response to the requesting client
      user.hashed_password = undefined;
      user.salt = undefined;

      res.json(user);
    } catch (error) {
      
    }
  }

  const remove = async (req, res) => {
    try {
      let user = req.profile
      let deletedUser = await user.remove()
      deletedUser.hashed_password = undefined
      deletedUser.salt = undefined
      res.json(deletedUser)
    } catch (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
  }

module.exports = { 
    create,
    userByID,
    read,
    update,
    remove
};