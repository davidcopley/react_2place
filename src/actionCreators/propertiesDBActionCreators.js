import axios from "axios"
import ImageCompressor from "@xkeshi/image-compressor"
import {api} from "../constants/api"
import {addCalledApi} from "./apiHistoryActionCreators"
import {push} from "react-router-redux"
export const setPropertiesBasic = propertiesBasic => ({type:"setPropertiesBasic",propertiesBasic})
export const setPropertiesDetail = propertiesDetail => ({type:"setPropertiesDetail",propertiesDetail})
export const setPropertiesCoordinates = propertiesCoordinates => ({type:"setPropertiesCoordinates",propertiesCoordinates})
export const addPropertyDetail = (propertyId,propertyDetail) => ({type:"addPropertyDetail",propertyId,propertyDetail})
export const addPropertyCoordinates = (propertyId,propertyCoordinates) => ({type:"addPropertyCoordinates",propertyId,propertyCoordinates})

const headerShit = {headers: {"Accept": "application/vnd.rex.v1+json","Authorization": "Bearer " + localStorage.getItem('1p_token')}}

export const getPropertiesBasic = (force=false) => (dispatch, getState) => {
    const url = `${api}agents/self/properties`
    if(!getState().apiHistoryReducer.calledApis[url]||force){
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
export const getPropertyDetail = (id,force=false) => (dispatch,getState) => new Promise((resolve,reject)=>{
    const url = `${api}properties/${id}`
    if(!getState().apiHistoryReducer.calledApis[url]||force) {
        axios.get(url, headerShit)
            .then(res => {
                const {data} = res.data
                dispatch(addCalledApi(url))
                dispatch(addPropertyDetail(id, data))
                resolve(data)
            })
            .catch(err => {
                console.log(err)
                reject(err)
            })
    }
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

export const postProperty = data => (dispatch,getState) => new Promise((resolve,reject)=>{
    const url = `${api}agents/self/properties`
    axios.post(url,data,headerShit)
        .then(res=>{
            console.log(res)
            dispatch(getPropertiesBasic(true))
            dispatch(push("/propertiesTiles"))
            return resolve(res)
        })
        .catch(err=>{
            console.log(err)
            return reject(err)
        })
})

export const postPropertyImages = (id,images) => (dispatch,getState) => {
    images.forEach(image=>{
        dispatch(postPropertyImage(id,image))
    })

}

export const postPropertyImage = (id,image) => (dispatch,getState) => {
    const url = `${api}agents/self/properties/${id}/upload_images`
    let formData = new FormData()
    const imageCompressor = new ImageCompressor();
    imageCompressor.compress(image,{
        maxHeight:1280,
        maxWidth:1280,
    }).then(compressedImage=>{
        formData.append('upload_images[index]',compressedImage)
        axios.post(url,formData,headerShit)
            .then(res=>{
                dispatch(getPropertiesBasic(true))
            })
            .catch(err=>{
                console.log(err)
            })
    })

}