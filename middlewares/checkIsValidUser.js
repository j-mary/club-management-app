import User from '../models/User';
import errorHandler from '../helpers/errorHandler';

const checkIsValidUser = async ({ decoded: { slug } }, res, next) => {
  try {
    const userToEdit = await User.findBySlug(slug);
    if (userToEdit) {
      return next();
    }
    return res.status(404).json({
      message: 'You do not seem to be registered, please sign up or try again',
    });
  } catch (error) {
    const errorData = errorHandler(error, 'user');
    const { message, statusCode } = errorData;
    return res.status(statusCode).json({
      message,
    });
  }
};

export default checkIsValidUser;
