const defaultState = {
    locale:"en"
}

export default (state=defaultState,action) => {
    switch(action.type){
        case("setLocale"):
            return {...state,locale:action.locale}
        default:
            return state
    }
}