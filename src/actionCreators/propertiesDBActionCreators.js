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

export const getPropertiesBasic = (force=false) => (dispatch, getState) => new Promise((resolve,reject)=>{
    const url = `${api}agents/self/properties`
    if(!getState().apiHistoryReducer.calledApis[url]||force){
        axios
            .get(url,headerShit)
            .then(res=>{
                dispatch(addCalledApi(url))
                const propertiesBasic = res.data.data
                let propertiesBasicSet = {}
                propertiesBasic.forEach(propertyBasic=>{
                    if(!propertyBasic['is_hidden_by_agent']) {
                        const {property_id} = propertyBasic
                        propertiesBasicSet[property_id] = propertyBasic
                    }
                })
                dispatch(setPropertiesBasic(propertiesBasicSet))
                resolve(res)
            })
            .catch(err=>{
                console.log(err)
                reject(err)
            })
    }
})
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
    const url = `https://maps.google.com/maps/api/geocode/json?address=${address}`
    if(!getState().apiHistoryReducer.calledApis[url]){
        axios.get(url)
            .then(res=>{
                dispatch(addCalledApi(url))
                const {data} =res
                if(data.results&&data.results[0]){
                    const coordinates = data.results[0].geometry.location
                    dispatch(addPropertyCoordinates(propertyId,coordinates))
                }else{
                    address = address.split(",").slice(1).join(",")
                    if(address.length>0){
                        dispatch(getPropertyCoordinatesByAddress(propertyId,address))
                    }
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
            dispatch(getPropertiesBasic(true))
            dispatch(push("/propertiesTiles"))
            resolve(res)
        })
        .catch(err=>{
            reject(err)
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
                dispatch(getPropertyDetail(id,true))
            })
            .catch(err=>{
                console.log(err)
            })
    })
}

export const putProperty = (id,data) => (dispatch,getState) => new Promise((resolve,reject) => {
    const url = `${api}agents/self/properties/${id}`
    axios.post(url,data,headerShit)
        .then(res=>{
            dispatch(getPropertiesBasic(true))
            dispatch(getPropertyDetail(id,true))
            dispatch(push(`/propertyPage/${id}`))
            resolve(res)
        })
        .catch(err=>{
            console.log(err)
        })
})

export const hideProperty = id => (dispatch,getState) => {
    const url = `${api}agents/self/properties/${id}/mark_hidden`
    axios.post(url,'',headerShit)
        .then(res=>{
            console.log(res)
            dispatch(getPropertiesBasic(true))
                .then(res=>{
                    dispatch(push("/propertiesTiles"))
                })
        })
        .catch(err=>{
            console.log(err)
        })
}