const defaultState = {
    propertiesBasic:{},
    propertiesDetailedInfo:{}
}

export default (state=defaultState,action) => {
    switch(action.type){
        case("setPropertiesBasic"):
            return {...state,propertiesBasic:action.propertiesBasic}
        case("addPropertyDetailedInfo"):
            return {...state,proeprtiesDetailedInfo:{...state.propertiesDetailedInfo,[action.propertyId]:action.propertyDetailedInfo}}
        default:
            return state
    }
}