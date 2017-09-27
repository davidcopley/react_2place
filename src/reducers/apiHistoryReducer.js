const defaultState = {
    calledApis:{}
}

export default (state=defaultState,action) => {
    switch(action.type){
        case("addCalledApi"):
            return {...state,calledApis:{...state.calledApis,[action.calledApi]:true}}
        default:
            return state
    }
}