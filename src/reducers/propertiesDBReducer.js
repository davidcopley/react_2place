const defaultState = {
    propertiesBasic:{},
    propertiesDetail:{},
    propertiesCoordinates:{}
}

export default (state=defaultState,action) => {
    switch(action.type){
        case("setPropertiesBasic"):
            return {...state,propertiesBasic:action.propertiesBasic}
        case("setPropertiesDetail"):
            return {...state,propertiesDetail:action.propertiesDetail}
        case("setPropertiesCoordinates"):
            return {...state,propertiesCoordinates:action.propertiesCoordinates}
        case("addPropertyDetail"):
            return {...state,propertiesDetail:{...state.propertiesDetail,[action.propertyId]:action.propertyDetail}}
        case("addPropertyCoordinates"):
            return {...state,propertiesCoordinates:{...state.propertiesCoordinates,[action.propertyId]:action.propertyCoordinates}}
        default:
            return state
    }
}