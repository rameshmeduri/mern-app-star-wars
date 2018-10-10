import { LOGIN_USER, LOGOUT_USER, INIT_URL } from 'actions/types';

let userObj = null;
const userStr = localStorage.getItem('user');
if (userStr) { userObj = JSON.parse(userStr); }

const INIT_STATE = {
  user: userObj,
  initURL: ''
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {

    case LOGIN_USER: {
      return {
        ...state,        
        user: action.payload
      }
    }

    case LOGOUT_USER: {
      return {
        ...state,
        user: null,
        initURL: '/app/search_planet'
      }
    }

    case INIT_URL: {
      return {
        ...state,
        initURL: action.payload
      }
    }

    default: return state;

  }
};
