import axios from 'axios';
import {STOCK_DATA_BASE_URL, API_KEY} from '../config'
import {fetchHoldingsWithPriceByUserId} from './holding';
import {me} from './user';
const GET_TRADES = 'GET_TRADES';
const SET_ERROR = 'SET_ERROR';
const SET_VALID_SYMBOLS = 'SET_VALID_SYMBOLS';

const getTrades = trades => ({type: GET_TRADES, trades});
const setError = error => ({type: SET_ERROR, error});
const setValidSymbols = validSymbolSet =>
    ({type: SET_VALID_SYMBOLS, validSymbolSet});

export const fetchTradesByUserId = (userId) => async dispatch => {
  const {data} = await axios.get(`/api/trades/user/${userId}`);
  return dispatch(getTrades(data));
};

export const fetchAllValidSymbols = () => async dispatch => {
  const {data} =
      await axios.get(`${STOCK_DATA_BASE_URL}/ref-data/iex/symbols?token=${API_KEY}`);
  const validSymbolSet = new Set(data.map(stock => stock.symbol));
  return dispatch(setValidSymbols(validSymbolSet));
};

export const buy = function(userId, symbol, shares) {
  return async function(dispatch) {
    const {data} =
        await axios.get(`${STOCK_DATA_BASE_URL}/stock/${symbol}/price?token=${API_KEY}`);
    try {
      await axios.post(
          `/api/trades/user/${userId}`,
          {userId: userId, symbol: symbol, shares: shares, price: data});
      dispatch(setError(null));
    } catch (err) {
      return dispatch(setError(err));
    }
    dispatch(me());
    dispatch(fetchHoldingsWithPriceByUserId(userId));
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