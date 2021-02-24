export function startCountdown() {
    return {
        type: 'COUNTDOWN_HAS_STARTED'
    };
}

export function pauseCountdown() {
    return {
        type: 'COUNTDOWN_IS_PAUSED'
    };
}

// export function formIsFilled() {
//     return {
//         type: 'FORM_IS_FILLED'
//     };
// }

export function resetCountdown() {
    return {
        type: 'COUNTDOWN_IS_RESET'
    };
}

export function endWorkPeriod() {
    return {
        type: 'WORK_IS_OVER'
    };
}

export function endRestPeriod() {
    return {
        type: 'REST_IS_OVER'
    };
}

export function updateDb() {
    return {
        type: 'UPDATE_DB'
    };
}

export function autoTransitionOn() {
    return {
        type: 'AUTO_IS_ON'
    }
}

export function toggleActivities() {
    return {
        type: 'TOGGLE_VIEW'
    }
}

export function toggleEditActivities() {
    return {
        type: 'TOGGLE_EDIT'
    }
}