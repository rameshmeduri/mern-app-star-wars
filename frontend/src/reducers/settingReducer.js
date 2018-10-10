import $ from 'jquery';

import {  
  TOGGLE_COLLAPSED_NAV,
  WINDOW_WIDTH,
  FIXED_DRAWER
} from 'actions/types';

const INIT_STATE = {
  navCollapsed: false,
  drawerType: FIXED_DRAWER,
  width: $(window).width()
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {

    case '@@router/LOCATION_CHANGE':
      return {
        ...state,
        navCollapsed: false
      };

    case TOGGLE_COLLAPSED_NAV:
      return {
        ...state,
        navCollapsed: action.isNavCollapsed
      };

    case WINDOW_WIDTH:
      return {
        ...state,
        width: action.width
      };

    default: return state;

  }
};