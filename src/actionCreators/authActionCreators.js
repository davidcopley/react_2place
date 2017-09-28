import axios from "axios"
import {api, oauthShit} from "../constants/api"
import {setCalledApis} from "./apiHistoryActionCreators"
import {setPropertiesBasic} from "./propertiesDBActionCreators"
export const setAccessToken = accessToken => ({type: "setAccessToken", accessToken})
export const signin = (username, password) => (dispatch, getState) => {
    axios
        .post(`${api}oauth/access_token`, {
            username,
            password,
            ...oauthShit
        })
        .then(res=>{
            console.log(res)
            const {access_token} = res.data
            localStorage.setItem('1p_token', access_token);
            dispatch(setAccessToken(access_token))
            dispatch(setCalledApis({}))
        })
        .catch(err=>{
            console.log(err)
        })
}
export const signout = () => (dispatch, getState) => {
    localStorage.setItem('1p_token', "");
    dispatch(setPropertiesBasic({}))
    dispatch(setAccessToken(null))
}