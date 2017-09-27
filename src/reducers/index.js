import {combineReducers} from "redux"
import authReducer from "./authReducer"
import apiHistoryReducer from "./apiHistoryReducer"
import propertiesDBReducer from "./propertiesDBReducer"

export default combineReducers({
    authReducer,
    apiHistoryReducer,
    propertiesDBReducer
})