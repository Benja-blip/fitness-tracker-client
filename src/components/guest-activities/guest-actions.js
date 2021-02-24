import * as actionTypes from './guest-types';

export const addActivity = (title) => {
    return {
        type: actionTypes.ADD_ACTIVITY,
        payload: {
            name: title
        },
    };
};

export const listActivity = (activity) => {
    return {
        type: actionTypes.LIST_ACTIVITY,
        payload: {
            activity
        },
    };
};

export const updateActivity = (title, activityType, activityRoutine, activityComment) => {
    return {
        type: actionTypes.UPDATE_ACTIVITY,
        payload: {
            name: title,
            kind: activityType,
            playlist: activityRoutine,
            thoughts: activityComment
        },
    };
};

export const deleteActivity = (title) => {
    return {
        type: actionTypes.DELETE_ACTIVITY,
        payload: {
            name: title
        },
    };
};