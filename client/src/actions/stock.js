import {STOCK_DATA_BASE_URL, API_KEY} from '../config';
import { normalizeResponseErrors } from './utils';

export const FETCH_STOCK_REQUEST = 'FETCH_STOCK_REQUEST';
export const fetchStockRequest = () => ({
  type: FETCH_STOCK_REQUEST
});

export const FETCH_STOCK_SUCCESS = 'FETCH_STOCK_SUCCESS';
export const fetchStockSuccess = (stock) => ({
  type: FETCH_STOCK_SUCCESS,
  stock
});


export const FETCH_STOCK_INPUT_SUCCESS = 'FETCH_STOCK_INPUT_SUCCESS';
export const fetchStockInputSuccess = (stock) => ({
  type: FETCH_STOCK_INPUT_SUCCESS,
  stock
});

export const FETCH_STOCK_ERROR = 'FETCH_STOCK_ERROR';
export const fetchStockError = (error) => ({
  type: FETCH_STOCK_ERROR,
  error
});

export const fetchStock = (searchQuery) => dispatch => {
  dispatch(fetchStockRequest());
  fetch(`${STOCK_DATA_BASE_URL}&query=${searchQuery}&page=1`, {
    method: 'GET'
  })
  .then(res => normalizeResponseErrors(res))
  .then(res => res.json())
  .then(res => {
    dispatch(fetchStockSuccess(res.results));
  })
  .catch(err => {
    dispatch(fetchStockError(err));
  })
};

export const fetchStockWithPromise = (searchQuery) => dispatch => {
  dispatch(fetchStockRequest());
  return fetch(`${STOCK_DATA_BASE_URL}&query=${searchQuery}&page=1`, {
    method: 'GET'
  })
  .then(res => normalizeResponseErrors(res))
  .then(res => res.json())
  .then(res => {
    dispatch(fetchStockInputSuccess(res.results));
  })
  .catch(err => {
    dispatch(fetchStockError(err));
  })
};



export const FETCH_STOCK_DATA_REQUEST = 'FETCH_STOCK_DATA_REQUEST';
export const fetchStockDataRequest = () => ({
  type: FETCH_STOCK_DATA_REQUEST
});

export const FETCH_STOCK_DATA_SUCCESS = 'FETCH_STOCK_DATA_SUCCESS';
export const fetchStockDataSuccess = (data) => ({
  type: FETCH_STOCK_DATA_SUCCESS,
  data
});

export const FETCH_STOCK_DATA_ERROR = 'FETCH_STOCK_DATA_ERROR';
export const fetchStockDataError = (error) => ({
  type: FETCH_STOCK_DATA_ERROR,
  error
});

export const fetchStockData = (symbol) => dispatch => {
  dispatch(fetchStockDataRequest());
  fetch(`${STOCK_DATA_BASE_URL}/search/${symbol}/quote?token=${API_KEY}`, {
    method: 'GET'
  })
  .then(res => normalizeResponseErrors(res))
  .then(res => res.json())
  .then(data => {
    dispatch(fetchStockDataSuccess(data));
  })
  .catch(err => {
    dispatch(fetchStockDataError(err));
  });
};

export const STORE_REC_STOCK = 'STORE_REC_STOCK';
export const storeRecStock = (data) => ({
	type: STORE_REC_STOCK,
	data
});


export const DELETE_REC_STOCK = 'DELETE_REC_STOCK';
export const deleteRecStock = () => ({
	type: DELETE_REC_STOCK
});