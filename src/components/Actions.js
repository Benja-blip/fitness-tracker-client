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

export function formIsFilled() {
    return {
        type: 'FORM_IS_FILLED'
    };
}