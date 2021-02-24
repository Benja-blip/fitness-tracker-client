import { createStore, combineReducers, applyMiddleware } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
import { countdownReducer, resetCountdown, endWorkPeriod, updateDb,
endRestPeriod, autoTransitionOn, toggleActivities, toggleEditActivities } from './CountdownReducers';
import activityReducer from '../guest-activities/guest-reducer'

const rootReducer = combineReducers({
    form: formReducer,
    countdownHasStarted: countdownReducer,
    countdownIsReset: resetCountdown,
    workIsOver: endWorkPeriod,
    restIsOver: endRestPeriod,
    dbNeedsUpdating: updateDb,
    autoTransition: autoTransitionOn,
    activityToggle: toggleActivities,
    editActivityToggle: toggleEditActivities,
    activitiesList: activityReducer
})

const store = createStore(rootReducer, composeWithDevTools(
    applyMiddleware(logger),
));

export default store