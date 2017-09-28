const defaultState = {
    calledApis:{}
}

export default (state=defaultState,action) => {
    switch(action.type){
        case("setCalledApis"):
            return {...state,calledApis:action.calledApis}
        case("addCalledApi"):
            return {...state,calledApis:{...state.calledApis,[action.calledApi]:true}}
        default:
            return state
    }
}