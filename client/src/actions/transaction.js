import { API_BASE_URL } from '../config';
import { normalizeResponseErrors } from './utils';

export const addStockTransaction = (data) => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  dispatch(addStockTransactionRequest());
  return fetch(`${API_BASE_URL}/transactions/`, {
    method: 'POST',
    headers: {
        Authorization: `Bearer ${authToken}`,
      'content-type': 'application/json'
      
    },
    body: JSON.stringify(data)
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(data => {
      dispatch(addStockTransactionSuccess(data));
    })
    .catch(err => dispatch(addStockTransactionError(err)));
};
export const ADD_STOCK_TRANSACTION_REQUEST = 'ADD_STOCK_TRANSACTION_REQUEST';
export const addStockTransactionRequest = () => ({
  type: ADD_STOCK_TRANSACTION_REQUEST
});

export const ADD_STOCK_TRANSACTION_SUCCESS = 'ADD_STOCK_TRANSACTION_SUCCESS';
export const addStockTransactionSuccess = () => ({
  type: ADD_STOCK_TRANSACTION_SUCCESS
});
export const ADD_STOCK_TRANSACTION_ERROR = 'ADD_STOCK_TRANSACTION_ERROR';
export const addStockTransactionError = error => ({
  type: ADD_STOCK_TRANSACTION_ERROR,
  error
});

export const getTransactionList = () => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    dispatch(getTransactionListRequest());
    return fetch(`${API_BASE_URL}/transactions/`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${authToken}`
      }
    })
      .then(res => normalizeResponseErrors(res))
      .then(res => res.json())
      .then(data => {
        dispatch(getTransactionListSuccess(data));
      })
      .catch(err => dispatch(getTransactionListError(err)));
  };
  
  export const GET_TRANSACTION_LIST_REQUEST = 'GET_TRANSACTION_LIST_REQUEST';
  export const getTransactionListRequest = () => ({
    type: GET_TRANSACTION_LIST_REQUEST
  });
  
  export const GET_TRANSACTION_LIST_SUCCESS = 'GET_TRANSACTION_LIST_SUCCESS';
  export const getTransactionListSuccess = transactionList => ({
    type: GET_TRANSACTION_LIST_SUCCESS,
    transactionList
  });
  export const GET_TRANSACTION_LIST_ERROR = 'GET_TRANSACTION_LIST_ERROR';
  export const getTransactionListError = error => ({
    type: ADD_STOCK_TRANSACTION_ERROR,
    error
  });