const defaultState = {
    propertiesBasicInfo:{},
    propertiesDetailedInfo:{}
}

export default (state=defaultState,action) => {
    switch(action.type){
        case("addPropertyBasicInfo"):
            return {...state,propertiesBasicInfo:{...state.propertiesBasicInfo,[action.propertyId]:action.propertyBasicInfo}}
        case("addPropertyDetailedInfo"):
            return {...state,proeprtiesDetailedInfo:{...state.propertiesDetailedInfo,[action.propertyId]:action.propertyDetailedInfo}}
        default:
            return state
    }
}