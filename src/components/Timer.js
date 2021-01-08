import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import { formValueSelector } from 'redux-form';
import {useDispatch} from "react-redux";
import {startCountdown, resetCountdown, endWorkPeriod, endRestPeriod} from "../components/Actions";


let Timer = ({ workPeriod, countdownHasStarted, countdownIsReset, workIsOver, restPeriod, restIsOver, autoTransition }) => { 
	const [seconds, setSeconds] = useState(0); 
	const [minutes, setMinutes] = useState(workPeriod); 
	const dispatch = useDispatch();
	
	useEffect(() => { 
	// first initialize the minutes when the workPeriod is initialized
		if (!workIsOver) {
			setMinutes(workPeriod);
		} else if (workIsOver) {
			setMinutes(restPeriod)
		}
	}, [workPeriod, workIsOver, restPeriod]); 

	useEffect(() => {
		if (countdownIsReset) {
			if (countdownHasStarted) {
				dispatch(startCountdown());
			}
			if (workIsOver) {
				dispatch(endWorkPeriod());
			}
			setMinutes(workPeriod);
			setSeconds(0);
			dispatch(resetCountdown());
		}
	}, [workPeriod, countdownHasStarted, countdownIsReset, workIsOver, dispatch])
	
	useEffect(() => { 
		let interval; 
		if (minutes || seconds) { 
			interval = setInterval(() => { 
				if (countdownHasStarted) { 
					if (seconds > 0) { 
						setSeconds((sec) => sec - 1); 
						if (seconds === 1 && minutes === 0) {
							if (!workIsOver) {
								dispatch(endWorkPeriod());
								dispatch(endRestPeriod());
								document.title = 'hay'
								// dispatch(startCountdown());
							} else if (workIsOver && !restIsOver) {
								dispatch(endRestPeriod())
								dispatch(endWorkPeriod())
								// dispatch(startCountdown())
							}
						}
					} 
					if (seconds === 0) { 
						if (minutes === 0) { 
							clearInterval(interval);
						} else { 
							setMinutes((min) => min - 1); 
							setSeconds(59);
						} 
					} 
				} 
			}, 1000); 
		}
	
		return () => { 
	// cleanup function 
			clearInterval(interval); 
		}; 
	}, [countdownHasStarted, countdownIsReset, workIsOver, minutes, seconds, dispatch, restIsOver]); 
	
	return ( 
		<div className="numbers"> 
			<div className="box" id="minutes"> 
				<p>{minutes < 10 ? `0${minutes}` : minutes}</p> 
			</div> 
			<div className="box" id="colon"> 
				<p>:</p> 
			</div> 
			<div className="box" id="seconds"> 
				<p>{seconds < 10 ? `0${seconds}` : seconds}</p> 
			</div> 
		</div> 
		); 
	}; 
	
	Timer = connect((state) => { 
		const selector = formValueSelector("intervalSettings"); 
		const workPeriod = selector(state, "workPeriod"); 
		const restPeriod = selector(state, "restPeriod");
		const autoTransition = selector(state, "autoTransition")
		return { 
			workPeriod, 
			restPeriod,
			autoTransition,
			countdownHasStarted: state.countdownHasStarted, 
			countdownIsReset: state.countdownIsReset,
			workIsOver: state.workIsOver
		}; 
	})(Timer); 
	
	export default Timer; 
