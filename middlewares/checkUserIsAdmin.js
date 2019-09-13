import User from '../models/User';
import errorHandler from '../helpers/errorHandler';

const checkUserIsAdmin = async ({ decoded: { slug } }, res, next) => {
  try {
    const userFound = await User.findBySlug(slug);

    if (!userFound) {
      return res.status(404).json({
        message: 'You do not seem to be registered, please sign up or try again',// eslint-disable-line
      });
    }

    if (userFound.role !== 'Admin') {
      return res.status(403).json({
        message: 'You are not authorized to perform this action',
      });
    }
    next();
  } catch (error) {
    const errorData = errorHandler(error, 'user');
    const { message, statusCode } = errorData;
    return res.status(statusCode).json({
      message,
    });
  }
};

export default checkUserIsAdmin;
