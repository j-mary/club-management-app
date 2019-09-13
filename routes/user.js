import User from '../controllers/User';

import checkUserIsAuthenticated from '../middlewares/checkUserIsAuthenticated';
import checkUserIsAdmin from '../middlewares/checkUserIsAdmin';

const {
  validateRegistrationCredentials,
  validateSignInCredentials,
} = require('../middlewares/validateRequestCredentials');

const { signUp, signIn, getUsers, getUser, validateToken } = User;

export default app => {
  app.post('/api/v1/user/signup', validateRegistrationCredentials, signUp);
  app.post('/api/v1/user/signin', validateSignInCredentials, signIn);
  app.get(
    '/api/v1/admin/users',
    checkUserIsAuthenticated,
    checkUserIsAdmin,
    getUsers,
  );
  app.get('/api/v1/user/profile', checkUserIsAuthenticated, getUser);
  app.get(
    '/api/v1/user/token/validate',
    checkUserIsAuthenticated,
    validateToken,
  );
};
