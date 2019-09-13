import { UNAUTHENTICATE_USER, AUTHENTICATE_USER } from '../redux/actionTypes';
import AuthService from '../utilities/authService';

import loading from '../redux/loading';

const unAuthenticateUserAction = (type, data) => ({
  type: `${UNAUTHENTICATE_USER}_${type}`,
  data,
});

const authenticateUserAction = (type, data) => ({
  type: `${AUTHENTICATE_USER}_${type}`,
  data,
});

const unAuthenticateUser = () => dispatch => {
  dispatch(loading(UNAUTHENTICATE_USER, true));
  AuthService.removeToken();
  unAuthenticateUserAction(true);
  dispatch(authenticateUserAction('ERROR', ''));
  dispatch(loading(UNAUTHENTICATE_USER, false));
};

export default unAuthenticateUser;
