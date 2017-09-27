import axios from "axios"
import {api, oauthShit} from "../constants/api"
export const setAccessToken = accessToken => ({type: "setAccessToken", accessToken})
export const signin = (username, password) => (dispatch, getState) => {
    console.log(username,password)
    axios
        .post(`${api}oauth/access_token`, {
            username,
            password,
            ...oauthShit
        })
        .then(res=>{
            console.log(res)
            const {access_token} = res.data
            dispatch(setAccessToken(access_token))
        })
        .catch(err=>{
            console.log(err)
        })
}
export const signout = () => (dispatch, getState) => {
    dispatch(setAccessToken(null))
}