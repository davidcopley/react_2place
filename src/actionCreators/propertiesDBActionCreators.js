import axios from "axios"
import {api,headerShit} from "../constants/api"
import {addCalledApi} from "./apiHistoryActionCreators"
export const setPropertiesBasic = propertiesBasic => ({type:"setPropertiesBasic",propertiesBasic})
export const setPropertiesDetail = propertiesDetail => ({type:"setPropertiesDetail",propertiesDetail})
export const addPropertyDetail = (propertyId,propertyDetail) => ({type:"addPropertyDetail",propertyId,propertyDetail})
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
                console.log(res)
            })
            .catch(err=>{
                console.log(err)
            })
    }
}
export const getPropertyDetail = id => (dispatch,getState) => {
    const url = `${api}properties/${id}`
    axios.get(url,headerShit)
        .then(res=>{
            console.log(res)
            const {data} = res.data
            dispatch(addPropertyDetail(id,data))
        })
        .catch(err=>{
            console.log(err)
        })
}