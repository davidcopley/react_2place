import axios from "axios"
import {api,headerShit} from "../constants/api"

export const postUser = data => (dispatch,getState) => new Promise((resolve,reject) => {
    const url = `${api}agents`
    let formData = new FormData()
    Object.keys(data).forEach(key=>{
        console.log(key)
        formData.append(key,data[key])
    })
    axios.post(url,formData)
        .then(res=>{
            resolve(res)
        })
        .catch(err=>{
            reject(err)
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