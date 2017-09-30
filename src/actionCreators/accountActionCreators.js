import axios from "axios"
import {api,headerShit} from "../constants/api"

export const postUser = data => (dispatch,getState) => new Promise((resolve,reject) => {
    const url = `${api}agents`
    let formData = new FormData()
    const {
        display_name,
        email,
        username,
        password,
        password_confirmation,
        firstname,
        lastname,
        salutation,
        phone,
        phone_verify_code,
        license_number,
        agency,
        my_usage_of_property,
        referee_code,
        max_sell_price,
        min_sell_price,
        speaks_chinese,
        speaks_english,
        my_region,
        profilepic
    } = data
    Object.keys(data).forEach(key=>{
        console.log(key)
        formData.append(key,data[key])
    })
    axios.post(url,formData)
        .then(res=>{
            console.log(res)
        })
        .catch(err=>{
            console.log(err)
        })
})

export const getUser = () => (dispatch,getState) => new Promise((resolve,reject) => {
    const url = `${api}agents/self`
    axios.get(url,headerShit)
        .then(res=>{
            console.log(res)
        })
        .catch(err=>{
            console.log(err)
        })
})