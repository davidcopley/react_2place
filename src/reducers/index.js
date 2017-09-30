import {combineReducers} from "redux"
import {routerReducer } from 'react-router-redux'
import authReducer from "./authReducer"
import apiHistoryReducer from "./apiHistoryReducer"
import propertiesDBReducer from "./propertiesDBReducer"
import localeReducer from "./localeReducer"


export default combineReducers({
    routerReducer,
    authReducer,
    apiHistoryReducer,
    propertiesDBReducer,
    localeReducer
})