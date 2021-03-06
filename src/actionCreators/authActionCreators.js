import axios from "axios"
import {api, oauthShit} from "../constants/api"
import {setCalledApis} from "./apiHistoryActionCreators"
import {setPropertiesBasic,setPropertiesDetail,setPropertiesCoordinates} from "./propertiesDBActionCreators"
import {getUser} from "./accountActionCreators"
import {push} from "react-router-redux"
export const setAccessToken = accessToken => ({type: "setAccessToken", accessToken})
export const signin = (username, password) => (dispatch, getState) => {
    axios
        .post(`${api}oauth/access_token`, {
            username,
            password,
            ...oauthShit
        })
        .then(res=>{
            console.log(res.data)
            const {access_token} = res.data
            localStorage.setItem('1p_token', access_token);
            dispatch(setAccessToken(access_token))
            dispatch(setCalledApis({}))
            dispatch(getUser())
            window.location.reload(true)
            dispatch(push("/"))
        })
        .catch(err=>{
            console.log(err)
        })
}
export const signout = () => (dispatch, getState) => {
    localStorage.removeItem("1p_token")
    dispatch(setPropertiesBasic({}))
    dispatch(setPropertiesDetail({}))
    dispatch(setAccessToken(null))
    dispatch(setCalledApis({}))
    dispatch(setPropertiesCoordinates({}))
    window.location.reload(true)
    dispatch(push("/"))
}