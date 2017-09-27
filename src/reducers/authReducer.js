const defaultState = {
    authToken:null
}

export default (state=defaultState,action) => {
    switch(action){
        case("setAuthToken"):
            return {...state,authToken:action.authToken}
        default:
            return state
    }
}