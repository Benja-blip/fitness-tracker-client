import React, { useState, useEffect } from 'react';
import { ListGroup, ListGroupItem} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { API } from 'aws-amplify';
import "./EditActivity.css";

export default function EditActivity(props) {
    const [activities, setActivities] = useState([]);
    //const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function onload() {
            if(!props.isAuthenticated) {
                return;
            }

            try {
                const activities = await loadActivities();
                setActivities(activities);
            } catch(e) {
                console.log(e);
            }

            //setIsLoading(false);
        }

        onload();
    }, [props.isAuthenticated]);

    function loadActivities() {
        return API.get("activities", "/activities");
    }

    function renderActivitiesList(activities) {
        return [{}].concat(activities).map((activity, i) =>
            i !== 0 && (
                <LinkContainer key={activity.title} to={`/activities/${activity.noteId}`}>
                    <ListGroupItem header={activity.title}>
                        {"Type: " + activity.type}
                        {"  |  Routine: " + activity.routine}
                        {"  |  Comment: " + activity.comment}
                    </ListGroupItem>
                </LinkContainer>
            )
        );
    }

    return (
        <div className="activities">
            <div className="list-container">
                <ListGroup>
                    {props.isAuthenticated && renderActivitiesList(activities)}
                </ListGroup>
            </div>
        </div>
    );
}