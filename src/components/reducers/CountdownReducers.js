export function countdownReducer(state = false, action) {
    switch(action.type) {
        case 'COUNTDOWN_HAS_STARTED':
            return !state;
//        case 'COUNTDOWN_IS_PAUSED':
//            return !state;
        default:
            return state;
    }
}

export function resetCountdown(state = false, action) {
    switch(action.type) {
        case 'COUNTDOWN_IS_RESET':
            return !state;
        default:
            return state;
    }
}

export function endWorkPeriod(state = false, action) {
    switch(action.type) {
        case 'WORK_IS_OVER':
            return !state;
        default:
            return state;
    }
}

export function endRestPeriod(state = true, action) {
    switch(action.type) {
        case 'REST_IS_OVER':
            return !state;
        default:
            return state;
    }
}

export function updateDb(state = true, action) {
    switch(action.type) {
        case 'UPDATE_DB':
            return !state;
        default:
            return state;
    }
}

export function autoTransitionOn(state = true, action) {
    switch(action.type) {
        case 'AUTO_IS_ON':
            return !state;
        default:
            return state;
    }
}