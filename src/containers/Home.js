import React from "react";
import "./Home.css";
import Toggle from '../components/Toggle';
import NewActivity from './NewActivity';
import EditActivity from "./EditActivity";
import TimeForm from "./TimeForm";
import Timer from "../components/Timer";
import {startCountdown} from "../components/Actions";
import {useDispatch} from "react-redux";


export default function Home(props) {

  const dispatch = useDispatch();

  return ( props.isAuthenticated &&
    <div className="Home">
      <div className="left-container">
        <div className="information-panel">
          <button id="info-button">Info</button>
        </div>
      </div>
      <div className="center-container">
        <div className="lander">
          <h1>Remind</h1>
          <p>A simple fitness tracker app</p>
        </div>
        <div className="app-container">
          <div className="stopwatch">
            <Timer/>
            <div className="settings">
              <button onClick={() => {dispatch(startCountdown())}} className="setting" id="top-button">Start</button>
              <button onClick={() => {dispatch(startCountdown())}} className="setting" id="middle-button">Pause</button>
              <button className="setting" id="bottom-button">Reset</button>
            </div>
          </div>
          <div className="activity-display">
            <p>Activity will display here at next break</p>
          </div>
        </div>
      </div>
      <div className="right-container">
        <div className="settings-panel">
          <Toggle>
            {({ on, toggle }) => (
              <div>
                <button onClick={toggle}>New Activity</button>
                {on && <NewActivity {...props} />}
              </div>
            )}
          </Toggle>
          <Toggle {...props} >
            {({ on, toggle }) => (
              <div>
                <button onClick={toggle}>View/Edit Activities</button>
                {on && <EditActivity {...props} />}
              </div>
            )}
          </Toggle>
          <Toggle {...props} >
            {({ on, toggle }) => (
              <div>
                <button onClick={toggle}>Settings</button>
                {!on && <TimeForm onSubmit={TimeForm.submit} />}
              </div>
            )}
          </Toggle>
        </div>
      </div>
    </div>
  );
}