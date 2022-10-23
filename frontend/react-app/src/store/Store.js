import { createStore, combineReducers, compose } from 'redux'
import LoginReducer from './Reducers/LoginReducer'
<<<<<<< HEAD
=======
<<<<<<< HEAD

const reducer = combineReducers({
    LoginReducer,
=======
>>>>>>> FrontBeto
import DashBoardReducer from './Reducers/DashBoardReducer'

const reducer = combineReducers({
    LoginReducer,
    DashBoardReducer
<<<<<<< HEAD
=======
>>>>>>> refs/remotes/origin/FrontBeto
>>>>>>> FrontBeto
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const Store = createStore(
    reducer,
    composeEnhancers());

export default Store;