import { createStore, combineReducers, applyMiddleware } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger'
import { countdownReducer, resetCountdown, endWorkPeriod, updateDb,
endRestPeriod, autoTransitionOn } from './CountdownReducers'

const rootReducer = combineReducers({
    form: formReducer,
    countdownHasStarted: countdownReducer,
    countdownIsReset: resetCountdown,
    workIsOver: endWorkPeriod,
    restIsOver: endRestPeriod,
    dbNeedsUpdating: updateDb,
    autoTransition: autoTransitionOn
})

const store = createStore(rootReducer, composeWithDevTools(
    applyMiddleware(logger),
));

export default store