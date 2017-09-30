import axios from 'axios'
import {api} from "../constants/api"
export const sendVerificationCode = (countryCode,phoneNumber) => (dispatch,getState) => new Promise((resolve,reject)=>{
    const phone = `${countryCode}-${phoneNumber}`
    const url = `${api}send_phone_verify_code`
    axios.post(url,{phone})
        .then(res=>{
            console.log(res)
            return resolve(res)
        })
        .catch(err=>{
            console.log(err)
            return reject(err)
        })
})
export const validateVerificationCode = (countryCode,phoneNumber,code) => (dispatch,getState) => new Promise((resolve,reject)=> {
    const phone = `${countryCode}-${phoneNumber}`
    const url = `${api}check_phone_verify_code`
    axios.post(url,{phone,code})
        .then(res=>{
            console.log(res)
            return resolve(res)
        })
        .catch(err=>{
            console.log(err)
            return reject(err)
        })
})