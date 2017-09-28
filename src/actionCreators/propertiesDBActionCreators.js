import axios from "axios"
import {api,headerShit} from "../constants/api"
import {addCalledApi} from "./apiHistoryActionCreators"
export const setPropertiesBasic = propertiesBasic => ({type:"setPropertiesBasic",propertiesBasic})
export const setPropertiesDetail = propertiesDetail => ({type:"setPropertiesDetail",propertiesDetail})
export const setPropertiesCoordinages = propertiesCoordinates => ({type:"setPropertiesCoordinates",propertiesCoordinates})
export const addPropertyDetail = (propertyId,propertyDetail) => ({type:"addPropertyDetail",propertyId,propertyDetail})
export const addPropertyCoordinates = (propertyId,propertyCoordinates) => ({type:"addPropertyCoordinates",propertyId,propertyCoordinates})
export const getPropertiesBasic = () => (dispatch, getState) => {
    const url = `${api}agents/self/properties`
    if(!getState().apiHistoryReducer.calledApis[url]){
        axios
            .get(url,headerShit)
            .then(res=>{
                dispatch(addCalledApi(url))
                const propertiesBasic = res.data.data
                let propertiesBasicSet = {}
                propertiesBasic.forEach(propertyBasic=>{
                    const {property_id} = propertyBasic
                    propertiesBasicSet[property_id] = propertyBasic
                })
                dispatch(setPropertiesBasic(propertiesBasicSet))
            })
            .catch(err=>{
                console.log(err)
            })
    }
}
export const getPropertyDetail = id => (dispatch,getState) => new Promise((resolve,reject)=>{
    const url = `${api}properties/${id}`
    axios.get(url,headerShit)
        .then(res=>{
            const {data} = res.data
            dispatch(addPropertyDetail(id,data))
            resolve(data)
        })
        .catch(err=>{
            console.log(err)
            reject(err)
        })
})
export const getPropertyCoordinatesByAddress = (propertyId,address) => (dispatch,getState) => {
    const url = `http://maps.google.com/maps/api/geocode/json?address=${address}`
    if(!getState().apiHistoryReducer.calledApis[url]){
        axios.get(url)
            .then(res=>{
                dispatch(addCalledApi(url))
                const {data} =res
                if(data.results&&data.results[0]){
                    const coordinates = data.results[0].geometry.location
                    dispatch(addPropertyCoordinates(propertyId,coordinates))
                }
            })
            .catch(err=>{
                console.log(err)
            })
    }
}