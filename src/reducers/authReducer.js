const defaultState = {
    accessToken:null
}

export default (state=defaultState,action) => {
    switch(action.type){
        case("setAccessToken"):
            return {...state,accessToken:action.accessToken}
        default:
            return state
    }
}