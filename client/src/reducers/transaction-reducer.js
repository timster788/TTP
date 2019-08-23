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
  symbol: null,
  quantity: null,
  results: [],
  loading: false,
  error: null
};
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_STOCK_TRANSACTION_REQUEST:
      // Mark the state as "loading" so we can show a spinner or something
      // Also, reset any errors. We're starting fresh.
      return {
        ...state,
        userId: action.currentUser,
        symbol: null,
        quantity: null
      };

    case ADD_STOCK_TRANSACTION_SUCCESS:
      // Mark the state as "loading" so we can show a spinner or something
      // Also, reset any errors. We're starting fresh.
      return {
        ...state

        //symbol: action.response.symbol,
        // quantity: action.response.quantity
      };

    case ADD_STOCK_TRANSACTION_ERROR:
      // Mark the state as "loading" so we can show a spinner or something
      // Also, reset any errors. We're starting fresh.
      return {
        ...state,
        loading: false,
        //    error: action.payload.error,
        results: []
      };
    case GET_TRANSACTION_LIST_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };

    case GET_TRANSACTION_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        results: action.transactionList
      };

    case GET_TRANSACTION_LIST_ERROR:
      return {
        loading: false,
        // error: action.payload.error,
        results: []
      };

    default:
      return state;
  }
}

//   export default function reducer(state = initialState, action) {

//     if (action.type === ADD_STOCK_TRANSACTION_REQUEST) {
//       return {
//           ...state,
//         //   userId:action.currentUser,
//           symbol:null,
//           quantity:null
//       };
//     }

//     if (action.type === ADD_STOCK_TRANSACTION_SUCCESS) {
//         return {
//             ...state,
//             // userId:action.currentUser,
//             symbol:action.response.symbol,
//             quantity:action.response.quantity
//         };
//     }

//     if (action.type === ADD_STOCK_TRANSACTION_ERROR) {
//       return Object.assign({}, state, {
//         loading: false,
//         error: action.error
//       });
//     }

//     if (action.type === GET_TRANSACTION_LIST_REQUEST) {
//       return  {
//           ...state,
//         symbol:null,
//           quantity:null
//       };
//     }

//     if (action.type === GET_TRANSACTION_LIST_SUCCESS) {
//       return  {
//           ...state,
//         symbol:action.response.symbol,
//         quantity:action.response.quantity
//       };
//     }

//     if (action.type === GET_TRANSACTION_LIST_ERROR) {
//       return Object.assign({}, state, {
//         loading: false,
//         error: action.error
//       });
//     }

//     return state;
//   }
