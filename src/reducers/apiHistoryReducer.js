const defaultState = {
    calledAPIs:{}
}

export default (state=defaultState,action) => {
    switch(action){
        case("addCalledApi"):
            return {...state,calledAPIs:{...state.calledAPIs,[action.calledAPI]:true}}
        default:
            return state
    }
}