const defaultState = {
    propertiesBasic:{},
    propertiesDetail:{}
}

export default (state=defaultState,action) => {
    switch(action.type){
        case("setPropertiesBasic"):
            return {...state,propertiesBasic:action.propertiesBasic}
        case("setPropertiesDetail"):
            return {...state,propertiesDetail:action.propertiesDetail}
        case("addPropertyDetail"):
            return {...state,propertiesDetail:{...state.propertiesDetail,[action.propertyId]:action.propertyDetail}}
        default:
            return state
    }
}