import React from 'react'
import { connect, useSelector } from 'react-redux'
import { formValueSelector } from 'redux-form';

// constructor(props) {
//     super();
//     this.state = 
// }

let DisplayTime = props => {
    console.log("props for DisplayTime: ", props)
    if(!props.workPeriod && !props.countdownHasStarted) {
        return <p>00</p>;
    } else if(props.countdownHasStarted) {
        return <p>{props.minutes}</p>;
    } else {
        return <p>{props.workPeriod}</p>;
    }
}

const selector = formValueSelector('intervalSettings')
DisplayTime = connect(state => {
//    const countdownHasStarted = useSelector(state, 'countdownHasStarted')
    const workPeriod = selector(state, 'workPeriod')
    return {
        workPeriod,
        countdownHasStarted: state.countdownHasStarted
    }
})(DisplayTime)

export default (DisplayTime)