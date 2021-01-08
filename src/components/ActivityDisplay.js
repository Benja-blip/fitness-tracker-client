import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import { API } from 'aws-amplify';
import {useDispatch} from "react-redux";
import { updateDb } from './Actions';

let ActivityDisplay = ({workIsOver, dbNeedsUpdating, restIsOver}) => {

    const [placeholder, setPlaceholder] = useState("Activity will display here at next break")
    const [activities, setActivities] = useState([]);
    const [displayActivities] = useState([]);
    // const [finishedActivities, setFinishedActivites] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {

        if(!dbNeedsUpdating) {
            return (console.log("Update your database son."));
        } else if (dbNeedsUpdating) {
            try {
                const activities = loadActivities();
                setActivities(activities);
                console.log("Hello")
                console.log("Activities: ", activities)
                try {
                    activities.then(promise => {
                        console.log("Promise ", promise)
                        promise.forEach(element => {
                            if (!displayActivities.includes(element.title)) {
                                displayActivities.push(element.title)
                                console.log("Display Activities: ", displayActivities)

                            }
                            // console.log("Element: ", element.title)
                        });
                    });
                } catch (e) {
                    console.log(e);
                }
                dispatch(updateDb());
            } catch(e) {
                console.log(e);
            }
        }
    }, [dbNeedsUpdating, dispatch, activities, displayActivities]);

    function loadActivities() {
        return API.get("activities", "/activities");
    }

    useEffect(() => {
        // setPlaceholder("Activity will display here at next break")
        // why the fuck is restIsOver not being recognized at all?
        if (workIsOver) {
            setPlaceholder(displayActivities[0])
        } else if (restIsOver) {
            displayActivities.shift()
            console.log("Newly shifted array: ", displayActivities)
            setPlaceholder("Activity will display here at next break")
        }
    }, [workIsOver, displayActivities, restIsOver])

    return (
        <div className="activity-display">
            <p>{placeholder}</p>
        </div>
    );
}

ActivityDisplay = connect((state) => { 
    return { 
        workIsOver: state.workIsOver,
        restIsOver: state.restIsOver,
        dbNeedsUpdating: state.dbNeedsUpdating
    }; 
})(ActivityDisplay); 

export default ActivityDisplay; 

// let mapStateToProps = (state) => { return {workIsOver: state.workIsOver} }

// connect(mapStateToProps)(ActivityDisplay)

// export default ActivityDisplay;