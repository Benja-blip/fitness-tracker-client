import * as actionTypes from './guest-types';

const INITIAL_STATE = {
    activities: [] // {name, kind, playlist, thoughts}
}

const actionReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case actionTypes.ADD_ACTIVITY:
            return {}
        case actionTypes.LIST_ACTIVITY:
            return {}
        case actionTypes.UPDATE_ACTIVITY:
            return {}
        case actionTypes.DELETE_ACTIVITY:
            return {}
        default:
            return state;
    }
}

export default actionReducer;