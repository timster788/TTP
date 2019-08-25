import { API_BASE_URL, STOCK_DATA_BASE_URL, API_KEY ,TRADE_DATA_BASE_URL} from '../config';
import { loadAuthToken } from '../local-storage';

import axios from 'axios';
import {fetchHoldingsWithPriceByUserId} from './holding.js';
// import {me} from './user';
const GET_TRADES = 'GET_TRADES';
const SET_ERROR = 'SET_ERROR';
const SET_VALID_SYMBOLS = 'SET_VALID_SYMBOLS';

const getTrades = trades => ({type: GET_TRADES, trades});
const setError = error => ({type: SET_ERROR, error});
const setValidSymbols = validSymbolSet =>
    ({type: SET_VALID_SYMBOLS, validSymbolSet});

export const fetchTradesByUserId = () => async dispatch => {
  const {data} = await axios({
    method: 'GET',
    url:`${API_BASE_URL}/transactions/`,
    headers: {
      Authorization: 'Bearer ' + loadAuthToken()
    }
  });
  return dispatch(getTrades(data));
};

export const fetchAllValidSymbols = () => async dispatch => {
  const {data} =
      await axios({
        method: 'GET',
        url:`${TRADE_DATA_BASE_URL}/ref-data/symbols`,
        // headers: {
          
        //   Authorization: 'Bearer ' + loadAuthToken()
          
        // }
      });
  const validSymbolSet = new Set(data.map(stock => stock.symbol));
  return dispatch(setValidSymbols(validSymbolSet));
};

export const buy = function( symbol, shares) {
  return async function(dispatch) {
    const {data} =
    await axios({
      method: 'GET',
      url:`${STOCK_DATA_BASE_URL}/stock/${symbol}/price?token=${API_KEY}`,
      

     
    }
    )
    
    
    
    try {
      await axios({
        method: 'POST',
        url:`${API_BASE_URL}/transactions/`,
        headers: {
          Authorization: 'Bearer ' + loadAuthToken()
        }, 
        symbol: symbol, 
        shares: shares,
         price: data
      });
      dispatch(setError(null));
    } catch (err) {
      return dispatch(setError(err));
    }
    
    dispatch(fetchHoldingsWithPriceByUserId());
  };
};

const initialState = {
  tradesByUserId: [],
  error: null,
  validSymbolSet: new Set()
};

const tradeReducer = function(state = initialState, action) {
  switch (action.type) {
    case GET_TRADES:
      return {
        ...state,
        tradesByUserId: action.trades,
      };
    case SET_ERROR:
      return { ...state, error: action.error }
    case SET_VALID_SYMBOLS:
      return { ...state, validSymbolSet: action.validSymbolSet }
    default:
      return state;
  }
};

export default tradeReducer;




















// export const fetchAllValidSymbols = symbol => async dispatch => {
//   const { data } = fetch(
//     `${STOCK_DATA_BASE_URL}/search/${symbol}/quote?token=${API_KEY}`,
//     {
//       method: 'GET'
//     }
//   );
//   const validSymbolSet = new Set(data.map(stock => stock.symbol));
//   return dispatch(setValidSymbols(validSymbolSet));
// };
