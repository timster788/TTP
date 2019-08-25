
import { API_BASE_URL, STOCK_DATA_BASE_URL, API_KEY ,TRADE_DATA_BASE_URL} from '../config';

import { loadAuthToken } from '../local-storage';
import axios from 'axios';

const GET_HOLDINGS_WITH_PRICE = 'GET_HOLDINGS_WITH_PRICE';

const getHoldingsWithPrice = (holdingsWithPrice, portfolioTotal) =>
    ({type: GET_HOLDINGS_WITH_PRICE, holdingsWithPrice, portfolioTotal});

export const fetchHoldingsWithPriceByUserId = () => async dispatch => {
  const {data} = await axios({
    method: 'GET',
    url:`${API_BASE_URL}/portfolio/`,
    headers: {
      Authorization: 'Bearer ' + loadAuthToken()
    }
  });

  if (data.length === 0) {
    return dispatch(getHoldingsWithPrice([], 0));
  }

  const symbols = data.map(holdings => holdings.symbol).join(',');

  const iexRets = await axios({
    method: 'GET',
    url: `${STOCK_DATA_BASE_URL}/stock/symbols=${symbols}/ohlc?token=${API_KEY}`,
    // headers: {
    //   Authorization: 'Bearer ' + loadAuthToken()
    // }
    // ${TRADE_DATA_BASE_URL}/stock/market/batch?symbols=${
    //   symbols}&types=price,ohlc`,

  });
  const iexInfo = iexRets.data;

  
  let combined = [];
  let portfolioTotal = 0;
  for (let i = 0; i < data.length; ++i) {
    const symbol = data[i].symbol;
    combined.push({
      symbol: symbol,
      shares: data[i].shares,
      price: iexInfo[symbol].price,
      open: iexInfo[symbol].ohlc.open.price,
      change: iexInfo[symbol].price - iexInfo[symbol].ohlc.open.price
    });
    portfolioTotal += data[i].shares * iexInfo[symbol].price;
  }
  return dispatch(getHoldingsWithPrice(combined, portfolioTotal));
};

const initialState = {
  holdingsWithPrice: [],
  portfolioTotal: 0
};

const holdingReducer = function(state = initialState, action) {
  switch (action.type) {
    case GET_HOLDINGS_WITH_PRICE:
      return {
        ...state,
        holdingsWithPrice: action.holdingsWithPrice,
        portfolioTotal: action.portfolioTotal
      };
    default:
      return state;
  }
};

export default holdingReducer;
