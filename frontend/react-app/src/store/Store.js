import { createStore, combineReducers, compose } from 'redux'
import LoginReducer from './Reducers/LoginReducer'
<<<<<<< HEAD

const reducer = combineReducers({
    LoginReducer,
=======
import DashBoardReducer from './Reducers/DashBoardReducer'

const reducer = combineReducers({
    LoginReducer,
    DashBoardReducer
>>>>>>> refs/remotes/origin/FrontBeto
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const Store = createStore(
    reducer,
    composeEnhancers());

export default Store;