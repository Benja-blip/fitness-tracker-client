import React, { Component } from 'react';
import { connect } from 'react-redux'
import { formValueSelector } from 'redux-form';


class Timer extends Component {
	state = { seconds: 0, minutes: this.props.workPeriod };

	componentDidMount() {
	  setInterval(() => {
		const { minutes, seconds } = this.state;
		console.log("minute state: ", minutes);
		if (this.props.countdownHasStarted) {
		  if (seconds > 0) {
			this.setState(({ seconds }) => ({
			  seconds: seconds - 1
			}));
		  }
		  if (seconds === 0) {
			if (minutes === 0) {
			  clearInterval(this.myInterval);
			} else {
			  this.setState(({ minutes }) => ({
				minutes: minutes - 1,
				seconds: 59
			  }));
			}
		  }
		}
	  }, 1000);
	}
    componentWillUnmount() {
        clearInterval(this.myInterval)
    }
    render(){
        const { minutes, seconds } = this.state
        return(
            <div className="numbers">
                <div className="box" id="minutes">
                    <p>{minutes}</p>
                </div>
                <div className="box" id="colon">
                    <p>:</p>
                </div>
                <div className="box" id="seconds">
                    <p>{seconds < 10 ? `0${seconds}` : seconds}</p>
                </div>
            </div>
        );
    }
};

const selector = formValueSelector('intervalSettings')
Timer = connect(state => {
	const workPeriod = selector(state, 'workPeriod')
	// console.log("work period: ", workPeriod)
    return {
        workPeriod,
        countdownHasStarted: state.countdownHasStarted
    }
})(Timer)

export default Timer
