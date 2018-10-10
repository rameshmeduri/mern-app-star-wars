import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import settingReducer from './settingReducer';
import authReducer from './authReducer';



const reducers = combineReducers({
  routing: routerReducer,
  settings: settingReducer,
  auth: authReducer  
});

export default reducers;
