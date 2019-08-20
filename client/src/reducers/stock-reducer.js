import {
    FETCH_STOCK_REQUEST,
    FETCH_STOCK_SUCCESS,
    FETCH_STOCK_INPUT_SUCCESS,
    FETCH_STOCK_ERROR,
    FETCH_STOCK_DATA_REQUEST,
    FETCH_STOCK_DATA_SUCCESS,
    FETCH_STOCK_DATA_ERROR,
    
  } from '../actions/stock';
  
  const initialState = {
    loading: false,
    searchResults: null,
    inputSearchResults: null,
    recStockData: null,
    error: null,
    StockData: null,
    symbol:null
    
  }
  
  export default function reducer(state=initialState, action) {
    if (action.type === FETCH_STOCK_REQUEST) {
      return Object.assign({}, state, {
        loading: true
      });
    }
  
    if (action.type === FETCH_STOCK_SUCCESS) {
      return Object.assign({}, state, {
        loading: false,
        searchResults: action.Stock
      });
    }
  
   if (action.type === FETCH_STOCK_INPUT_SUCCESS) {
      return Object.assign({}, state, {
        loading: false,
        inputSearchResults: action.Stock
      });
    }
  
    if (action.type === FETCH_STOCK_ERROR) {
      return Object.assign({}, state, {
        loading: false,
        error: action.error
      });
    }
  
    if (action.type === FETCH_STOCK_DATA_REQUEST) {
      return Object.assign({}, state, {
        loading: true
      });
    }
  
    if (action.type === FETCH_STOCK_DATA_SUCCESS) {
      return Object.assign({}, state, {
        loading: false,
        StockData: action.data,
        symbol : action.symbol
      });
    }
  
    
  
  
  
    if (action.type === FETCH_STOCK_DATA_ERROR) {
      return Object.assign({}, state, {
        loading: false,
        error: action.error
      });
    }
    
    return state;
  }