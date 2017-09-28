import {createStore,applyMiddleware} from "redux"
import thunk from "redux-thunk"
import history from "./history"
import {routerMiddleware } from 'react-router-redux'
import {composeWithDevTools} from "redux-devtools-extension"
import reducers from "./reducers"
const createdRouterMiddleware = routerMiddleware(history)
export default createStore(reducers,composeWithDevTools(applyMiddleware(thunk,createdRouterMiddleware)))