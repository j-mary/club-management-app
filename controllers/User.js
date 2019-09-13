// const bcrypt = require('bcrypt');

// const user = require('../models/User');
// const errorHandler = require('../helpers/errorHandler');
// const createToken = require('../helpers/createToken');
// const generateRandomNumber = require('../helpers/generateRandomNumber');
import bcrypt from 'bcrypt';

import user from '../models/User';
import errorHandler from '../helpers/errorHandler';
import createToken from '../helpers/createToken';
import generateRandomNumber from '../helpers/generateRandomNumber';

// USE: client base-url to access change password link
const { NODE_ENV } = process.env,
  baseUrl =
    NODE_ENV === 'production'
      ? 'http://something.herokuapp.com'
      : 'http://localhost:5000'; // ;

/**
 *
 * @class User
 * @returns {object} static methods
 */
class User {
  /**
   *
   * @param {object} req
   * @param {object} res
   * @returns {object} response data
   * @memberof User class
   */
  static async signUp(req, res) {
    try {
      const { password, firstName, lastName } = req.body;
      const hash = await bcrypt.hash(password, 10);
      const slug = `${firstName}-${lastName}-${generateRandomNumber()}`;
      const createUser = await user.create({
        ...req.body,
        password: hash,
        slug,
      });
      return res.status(201).json({
        message: 'User created',
        token: createToken(createUser, '1d'),
      });
    } catch (error) {
      const errorData = errorHandler(error, 'user');
      const { statusCode, message } = errorData;
      return res.status(statusCode).json({
        message,
      });
    }
  }

  /**
   *
   * @param {object} req
   * @param {object} res
   * @returns {object} response data
   * @memberof User class
   */
  static async signIn(req, res) {
    try {
      const { email, password } = req.body;
      const registeredUser = await user.findOne({ email });
      if (registeredUser) {
        const validPassword = bcrypt.compareSync(
          password,
          registeredUser.password,
        );
        if (validPassword) {
          return res.status(200).json({
            message: 'successfuly signin',
            token: createToken(registeredUser, '1d'),
          });
        }
        return res.status(400).json({
          message: 'Incorrect email or password',
        });
      }
      return res.status(400).json({
        message: 'Invalid email or password',
      });
    } catch (error) {
      return res.status(500).json({ message: 'An error occur' });
    }
  }

  /**
   *
   *
   * @static
   * @param {*} { query: { page, limit }}
   * @param {object} res
   * @returns {json} response
   * @memberof User
   */
  static async getUsers(
    {
      query: { page, limit },
    },
    res,
  ) {
    try {
      const queryLimit = Number(limit) || 20;
      const currentPage = Number(page) || 1;
      const offset = (currentPage - 1) * queryLimit;
      const users = await user
        .find({}, null, {
          skip: offset,
        })
        .limit(queryLimit)
        .select('firstName lastName userName email slug');

      if (users.length > 0) {
        return res.status(200).json({
          message: 'users successfully fetched',
          users,
        });
      }
      return res.status(404).json({
        message: 'There are currently no users',
      });
    } catch (error) {
      const errorData = errorHandler(error, 'user');
      const { statusCode, message } = errorData;
      return res.status(statusCode).json({
        message,
      });
    }
  }

  /**
   *
   * @param {object} req
   * @param {object} res
   * @returns {object} response data
   * @memberof User class
   */
  static async getUser(req, res) {
    try {
      const { slug } = req.decoded;
      const userDetails = await user.findBySlug(slug);
      if (userDetails) {
        // eslint-disable-next-line max-len
        const { firstName, lastName, userName, email } = userDetails;
        return res.status(200).json({
          message: 'Request was successful',
          userInfo: {
            firstName,
            lastName,
            userName,
            email,
            slug,
          },
        });
      }
      return res.status(404).json({
        message:
          'You do not seem to be registered, please sign up or try again',
      });
    } catch (error) {
      const errorData = errorHandler(error, 'user');
      const { statusCode, message } = errorData;
      return res.status(statusCode).json({
        message,
      });
    }
  }

  /**
   *
   * @param {object} req
   * @param {object} res
   * @returns {object} response data
   * @memberof User class
   */
  static async validateToken(req, res) {
    try {
      const { slug } = req.decoded;
      await user.init();
      const foundUser = await user.findBySlug(slug);
      if (foundUser) {
        return res.status(200).json({
          message: "You've registered",
        });
      }
      return res.status(404).json({
        message: 'You do not seem to be registered',
      });
    } catch (error) {
      const errorData = errorHandler(error, 'user');
      const { statusCode, message } = errorData;
      return res.status(statusCode).json({
        message,
      });
    }
  }
}

export default User;
