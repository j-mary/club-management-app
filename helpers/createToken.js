import jwt from 'jsonwebtoken';

const { SECRET } = process.env;
const createToken = (user, time) => jwt.sign(
  {
    data: {
      firstName: user.firstName,
      lastName: user.lastName,
      userName: user.userName,
      email: user.email,
      slug: user.slug,
    },
  },
  SECRET,
  { expiresIn: time || '3h' },
);

export default createToken;
