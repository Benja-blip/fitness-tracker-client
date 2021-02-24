import React, { useState, useEffect } from "react";
// import { useHistory } from "react-router-dom";
import { API } from "aws-amplify";
import LoaderButton from "../components/LoaderButton";
import "./Activities.css";
import {connect} from "react-redux";

const Activities = (props) => {
  const activityId = props.activityId;
  // const history = useHistory();
  const [title, setTitle] = useState("");
  const [activityType, setActivityType] = useState("");
  const [activityRoutine, setActivityRoutine] = useState("");
  const [activityComment, setActivityComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  function validateForm() {
    return title.length > 0 && activityType.length > 0;
  }

  useEffect(() => {
    function loadActivity() {
      return API.get("activities", `/activities/${activityId}`);
    }

    async function onLoad() {
      if(props.isAuthenticated){
        try {
          const body = await loadActivity();
          const {title, activityType, activityRoutine, activityComment} = body
          setTitle(title);
          setActivityType(activityType);
          setActivityRoutine(activityRoutine);
          setActivityComment(activityComment);
        } catch (e) {
          console.log("get error: ", e);
        }
      } else {
        setTitle(props.title);
        setActivityType(props.activityType);
        setActivityRoutine(props.activityRoutine);
        setActivityComment(props.activityComment);
      }
    }

    onLoad();
  }, [activityId, props.title, props.activityType, props.activityRoutine, props.activityComment, props.isAuthenticated]);

  function saveActivity(activity) {
    try {
      return API.put("activities", `/activities/${activityId}`, {
        body: activity
      });

    } catch(e) {
      console.log("saveActivity error:", e);  
    }
  }

  async function handleSubmit(event) {

    event.preventDefault();

    setIsLoading(true)
    if(props.isAuthenticated) {
      try {
        await saveActivity({"title": title, "activityType": activityType, "activityRoutine": activityRoutine, "activityComment": activityComment});
        setIsLoading(false);
      } catch(e) {
        console.log("Save Activity error: ", e)
      }
    } else {
      for( let element of props.activities) {
        console.log("element: ", element)
        if(element.activityId === activityId.toString()) {
          console.log("match found")
          element.title = title;
          element.activityType = activityType;
          element.activityRoutine = activityRoutine;
          element.activityComment = activityComment;
          break;
        }
      };
      setIsLoading(false);
      
    }

  }

    function deleteNote() {
      return API.del("activities", `/activities/${activityId}`);
    }

    async function handleDelete(event) {
      event.preventDefault();
    
      const confirmed = window.confirm(
        "Are you sure you want to delete this note?"
      );
    
      if (!confirmed) {
        return;
      }
    
      setIsDeleting(true);

      try {
        await deleteNote();
        // history.push("/");
      } catch (e) {
        console.log(e);
        setIsDeleting(false);
      }
    }

  return (
    <div className="Activities">
      <p>Edit Activity</p>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
            <div className="input-div">
                <input value={title} onChange={e => setTitle(e.target.value)} placeholder={title}/>
            </div>
            <div className="input-div">
                <input value={activityType} onChange={e => setActivityType(e.target.value)} placeholder={activityType}/>
            </div>
            <div className="input-div">
                <input value={activityRoutine} onChange={e => setActivityRoutine(e.target.value)} placeholder={activityRoutine}/>
            </div>
            <div className="input-div">
                <input value={activityComment} onChange={e => setActivityComment(e.target.value)} placeholder={activityComment}/>
            </div>
            <LoaderButton
              block
              type="submit"
              bsSize="small"
              bsStyle="primary"
              isLoading={isLoading}
              disabled={!validateForm()}
            >
            Update
            </LoaderButton>
            <LoaderButton
              block
              size="small"
              onClick={handleDelete}
              isLoading={isDeleting}
            >
              Delete
            </LoaderButton>
        </form>
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
      activities: state.activitiesList.activities
  };
};

export default connect(mapStateToProps)(Activities);