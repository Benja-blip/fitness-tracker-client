import React, { useState, useEffect } from 'react';
// import { LinkContainer } from 'react-router-bootstrap';
import { API } from 'aws-amplify';
import Toggle from '../components/Toggle';
import "./ViewActivity.css";
import Activities from "./Activities";
import {connect} from "react-redux";

const ViewActivity = (props) => {
    const [activities, setActivities] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [message, setMessage] = useState("")

    useEffect(() => {
        if (props.isAuthenticated && isLoading) {
            setMessage("Loading...")
        }
    }, [isLoading, props.isAuthenticated])

    useEffect(() => {
        async function onload() {
            if(!props.isAuthenticated) {
                setIsLoading(true);
                const activities = props.activities;
                const noActivities = activities.length === 0;
                console.log("Activities length: ", activities.length)
                if(noActivities) {
                    setIsLoading(true);
                    setMessage("No activities created yet.")
                } else {
                    setActivities(activities);
                    setIsLoading(false);
                }
                return;
            } else {
                try {
                    setIsLoading(true)
                    const activities = await loadActivities();
                    setActivities(activities);
                    setIsLoading(false);
                } catch(e) {
                    console.log(e);
                    setIsLoading(false);
                }
            }
        }

        onload();
    }, [props.isAuthenticated, props.activities]);

    function loadActivities() {
        return API.get("activities", "/activities");
    }

    function renderActivitiesList(activities) {
        return [{}].concat(activities).map((activity, i) =>
            i !== 0 && (
                <div>
                    <Toggle {...props}>
                        {({on, toggle}) => (
                            <div>
                                <button id="activity-button" onClick={toggle}>
                                    <div id="title-div">
                                        {activity.title}
                                    </div>
                                    <div>
                                    {"Type: " + activity.activityType}
                                    {"  |  Routine: " + activity.activityRoutine}
                                    </div>
                                    {"Comment: " + activity.activityComment}
                                </button>
                                {on && <Activities 
                                activityId = {activity.activityId}
                                title = {activity.title}
                                activityType = {activity.activityType}
                                activityRoutine = {activity.activityRoutine}
                                activityComment = {activity.activityComment} 
                                {...props}/>}
                            </div>
                        )}
                    </Toggle>
                </div>
            )
        );
    }

    return (
        <div className="activities">
            {props.isAuthenticated ? message : message}
            <div className="list-container">
                <div id="actual-list">
                    {renderActivitiesList(activities)}
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        activities: state.activitiesList.activities
    };
};

export default connect(mapStateToProps)(ViewActivity);