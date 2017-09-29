import {api} from "../constants/api"
import axios from "axios"

export const getBuildingAddressAutocompletes = text => (dispatch,getState) => new Promise((resolve,reject)=>{
    const url=`${api}building_addresses?lang=eng&name=${text}`
    axios.get(url)
        .then(res=>{
            console.log(res)
            if(res.data) {
                return resolve(res.data)
            }else{
                return resolve([])
            }
        })
        .catch(err=>{
            console.log(err)
            return reject(err)
        })
})

export const getBuildingById = id => (dispatch,getState) => new Promise((resolve,reject)=>{
    const url=`${api}building_address?lang=eng&id=${id}`
    axios.get(url)
        .then(res=>{
            console.log(res)
            return resolve(res.data)
        })
        .catch(err=>{
            console.log(err)
            return reject(err)
        })
})