import { createStore, applyMiddleware, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import thunk from 'redux-thunk';
import { loadAuthToken } from './local-storage';
import authReducer from './reducers/auth';
import protectedDataReducer from './reducers/protected-data';
import { setAuthToken, refreshAuthToken } from './actions/auth';
import portfolioReducer from './reducers/portfolio-reducer';
import stockReducer from './reducers/stock-reducer';
import transactionReducer from './reducers/transaction-reducer';
import tradeReducer from './actions/trade'
import holdingReducer from './actions/holding'
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(
  combineReducers({
    form: formReducer,
    auth: authReducer,
    protectedData: protectedDataReducer,
    portfolio: portfolioReducer,
    stock: stockReducer,
    transaction: transactionReducer,
    trades:tradeReducer,
    holdings:holdingReducer
  }),
  applyMiddleware(thunk)
);

// Hydrate the authToken from localStorage if it exist
const authToken = loadAuthToken();
if (authToken) {
  const token = authToken;
  store.dispatch(setAuthToken(token));
  store.dispatch(refreshAuthToken());
}

export default store;
