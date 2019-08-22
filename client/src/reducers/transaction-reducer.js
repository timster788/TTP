import {
    ADD_STOCK_TRANSACTION_REQUEST,
    ADD_STOCK_TRANSACTION_SUCCESS,
    ADD_STOCK_TRANSACTION_ERROR,
    GET_TRANSACTION_LIST_REQUEST,
    GET_TRANSACTION_LIST_SUCCESS,
    GET_TRANSACTION_LIST_ERROR
  } from '../actions/transaction';
  const initialState = {
//    userId:null,
   symbol:null,
   quantity:null
  };
  
  export default function reducer(state = initialState, action) {
    
    if (action.type === ADD_STOCK_TRANSACTION_REQUEST) {
      return {
          ...state,
        //   userId:action.currentUser,
          symbol:null,
          quantity:null
      };
    }
  
    if (action.type === ADD_STOCK_TRANSACTION_SUCCESS) {
        return {
            ...state,
            // userId:action.currentUser,
            symbol:action.response.symbol,
            quantity:action.response.quantity
        };
    }
  
    if (action.type === ADD_STOCK_TRANSACTION_ERROR) {
      return Object.assign({}, state, {
        loading: false,
        error: action.error
      });
    }
  
    if (action.type === GET_TRANSACTION_LIST_REQUEST) {
      return Object.assign({}, state, {
        loading: true,
        error: null
      });
    }
  
    if (action.type === GET_TRANSACTION_LIST_SUCCESS) {
      return Object.assign({}, state, {
        loading: false,
        watchList: action.watchList
      });
    }
  
    if (action.type === GET_TRANSACTION_LIST_ERROR) {
      return Object.assign({}, state, {
        loading: false,
        error: action.error
      });
    }
  
    return state;
  }