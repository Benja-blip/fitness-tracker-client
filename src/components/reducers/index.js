import { createStore, combineReducers, applyMiddleware } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger'
import { countdownReducer } from './CountdownReducers'

const rootReducer = combineReducers({
    form: formReducer,
    countdownHasStarted: countdownReducer
//    formIsEmpty: filledReducer
})

const store = createStore(rootReducer, composeWithDevTools(
    applyMiddleware(logger),
));

export default store