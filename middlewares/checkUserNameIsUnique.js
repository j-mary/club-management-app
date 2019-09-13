import User from '../models/User';
import errorHandler from '../helpers/errorHandler';

const checkUserNameIsUnique = async (req, res, next) => {
  try {
    const {
      decoded: { slug },
      body: { userName },
    } = req;
    const user = await User.findOne({ userName });
    if (user) {
      const identityFoundIsDifferentToUserIdentity = user.slug !== slug;
      if (identityFoundIsDifferentToUserIdentity) {
        return res.status(409).json({
          message: 'sorry!, please try another username',
        });
      }
      return next();
    }
    return next();
  } catch (error) {
    const errorData = errorHandler(error, 'user');
    const { message, statusCode } = errorData;
    return res.status(statusCode).json({
      message,
    });
  }
};

export default checkUserNameIsUnique;
