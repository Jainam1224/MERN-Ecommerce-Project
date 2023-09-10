import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productDetailsReducer,
  productReducer,
} from "./reducers/productReducer";

const reducer = combineReducers({
  products: productReducer,
  productDetail: productDetailsReducer,
});

let initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;

// NOTE: If we want to connect backend and frontend for communication through API
// then we need to keep both on same port else it will throw CORS error so we have added
// "proxy": "http://127.0.0.1:4000" in package.json file of frontend because our backend is
// running on localhost:4000 and so we have made the frontend to pass through this url itself.
