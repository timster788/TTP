import { API_BASE_URL } from '../config';
import { normalizeResponseErrors } from './utils';


export const ADD_TO_PORTFOLIO_ERROR = 'ADD_TO_PORTFOLIO_ERROR';
export const addToPortfolioListError = error => ({
  type: ADD_TO_PORTFOLIO_ERROR,
  error
});


export const getPortfolio = id => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    dispatch(getPortfolioRequest());
    return fetch(`${API_BASE_URL}/portfolio/${id}`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${authToken}`
      }
    })
      .then(res => normalizeResponseErrors(res))
      .then(res => res.json())
      .then(data => {
        dispatch(getPortfolioSuccess(data));
      })
      .catch(err => dispatch(getPortfolioError(err)));
  };
  
  export const GET_PORTFOLIO_REQUEST = 'GET_PORTFOLIO_REQUEST';
  export const getPortfolioRequest = () => ({
    type: GET_PORTFOLIO_REQUEST
  });
  
  export const GET_PORTFOLIO_SUCCESS = 'GET_PORTFOLIO_SUCCESS';
  export const getPortfolioSuccess = portfolio => ({
    type: GET_PORTFOLIO_SUCCESS,
    portfolio
  });
  export const GET_PORTFOLIO_ERROR = 'GET_PORTFOLIO_ERROR';
  export const getPortfolioError = error => ({
    type: ADD_TO_PORTFOLIO_ERROR,
    error
  });
