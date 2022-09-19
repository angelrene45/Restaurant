import { createStore, combineReducers, compose } from 'redux'
import LoginReducer from './Reducers/LoginReducer'

const reducer = combineReducers({
    LoginReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const Store = createStore(
    reducer,
    composeEnhancers());

export default Store;