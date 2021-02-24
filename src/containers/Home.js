import React from "react";
import "./Home.css";
import Toggle from '../components/Toggle';
import NewActivity from './NewActivity';
import ViewActivity from "./ViewActivity";
import TimeForm from "./TimeForm";
import Timer from "../components/Timer";
import ActivityDisplay from "../components/ActivityDisplay"
import {startCountdown, resetCountdown} from "../components/Actions";
import {useDispatch, connect} from "react-redux";


const Home = (props) => {

  const dispatch = useDispatch();

  return ( props.isAuthenticated ?
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
        <div className="app-container"  {...props}>
          <div className="stopwatch">
            <Timer/>
            <div className="settings">
              <button onClick={() => {dispatch(startCountdown())}} className="setting" id="top-button">Start</button>
              <button onClick={() => {dispatch(startCountdown())}} className="setting" id="middle-button">Pause</button>
              <button onClick={() => {dispatch(resetCountdown())}} className="setting" id="bottom-button">Reset</button>
            </div>
          </div>
          <ActivityDisplay {...props}/>
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
                {on && <ViewActivity {...props} />}
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
  :
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
    <div className="app-container"  {...props}>
      <div className="stopwatch">
        <Timer/>
        <div className="settings">
          <button onClick={() => {dispatch(startCountdown())}} className="setting" id="top-button">Start</button>
          <button onClick={() => {dispatch(startCountdown())}} className="setting" id="middle-button">Pause</button>
          <button onClick={() => {dispatch(resetCountdown())}} className="setting" id="bottom-button">Reset</button>
        </div>
      </div>
      <ActivityDisplay {...props}/>
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
            {on && <ViewActivity {...props} />}
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

const mapStateToProps = state => {
  return {
      activities: state.activitiesList.activities,
      activityToggle: state.activityToggle
  };
};

export default connect(mapStateToProps)(Home);