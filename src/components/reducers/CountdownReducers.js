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

// export function hideComponents(state = true, action) {
//     switch(action.type) {
//         case 'DO_NOT_HIDE':
//             return !state;
//         default:
//             return state;
//     }
// }

// export function filledReducer(state = true, action) {
//     switch(action.type) {
//         case 'FORM_IS_FILLED':
//             return !state;
//         default:
//             return state;
//     }
// }
