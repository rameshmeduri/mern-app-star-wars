import axios from 'axios';
import { LOGIN_USER, LOGOUT_USER, INIT_URL, ADD_ALERT } from './types';
import setAuthToken from 'utils/setAuthToken';

const loginUser = userData => dispatch => {
  axios
    .post('/api/auth/login', userData)
    .then((res) => {
      const userObj = res.data;
      localStorage.setItem('user', JSON.stringify(userObj));
      setAuthToken(userObj.token);
      dispatch({ type: LOGIN_USER, payload: userObj });
    })
    .catch((err) => {
      let obj = err.response.data;
      let msg = obj.userId || obj.password;
      dispatch({
        type: ADD_ALERT,
        payload: { alertFor: 'Login', alertType: 'danger', alertMsg: msg }
      });
    });
};

const logoutUser = () => (dispatch) => {
  localStorage.removeItem('user');
  setAuthToken(false);
  dispatch({ type: LOGOUT_USER });
};

const setInitUrl = (url) => (dispatch) => {
  dispatch({ type: INIT_URL, payload: url });
};

export { loginUser, logoutUser, setInitUrl };
