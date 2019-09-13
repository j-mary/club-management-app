import { AUTHENTICATE_USER } from '../../../redux/actionTypes';
import loading from '../../../redux/loading';
import axios from '../../../redux/axios';
import AuthService from '../../../utilities/authService';

const authenticateUserAction = (type, data) => ({
  type: `${AUTHENTICATE_USER}_${type}`,
  data,
});

const authenticateUser = (url, data, cb) => async dispatch => {
  try {
    dispatch(loading(AUTHENTICATE_USER, true));
    const request = await axios.post(url, data);
    AuthService.saveToken(request.data.token);
    dispatch(authenticateUserAction('SUCCESS', request.data));
    cb();
    dispatch(loading(AUTHENTICATE_USER, false));
  } catch (error) {
    dispatch(loading(AUTHENTICATE_USER, false));
    if (error.response) {
      return dispatch(authenticateUserAction('ERROR', error.response.data));
    }
    dispatch(authenticateUserAction('ERROR', error));
  }
};

export default authenticateUser;
