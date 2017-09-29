import axios from "axios"
import {api} from "../constants/api"

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
        formData.append(key,data[key])
    })
})