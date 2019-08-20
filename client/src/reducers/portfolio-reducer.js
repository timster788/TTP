import {
    GET_PORTFOLIO_REQUEST, GET_PORTFOLIO_SUCCESS, GET_PORTFOLIO_ERROR
  } from '../actions/portfolio';
  
  const initialState = {
    loading: false,
    error:null
  }
  
  export default function portfolioReducer(state = initialState, action) {
    if (action.type === GET_PORTFOLIO_REQUEST) {
      return Object.assign({}, state, {
        loading: true,
        error: null
      });
    }
    else if (action.type === GET_PORTFOLIO_SUCCESS) {
      return Object.assign({}, state, {
       
        loading: false,
        error: null
      });
    }
    else if (action.type === GET_PORTFOLIO_ERROR) {
      return Object.assign({}, state, {
        loading: false,
        error: action.error
      });
    }
    return state;
  }