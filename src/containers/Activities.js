import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { API } from "aws-amplify";
import LoaderButton from "../components/LoaderButton";
// import { onError } from "../libs/errorLib";

export default function Activities() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [routine, setRoutine] = useState("");
  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function validateForm() {
    return title.length > 0 && type.length > 0;
  }

  useEffect(() => {
    function loadActivity() {
      return API.get("activities", `/activities/${id}`);
    }

    async function onLoad() {
      try {
        const activity = await loadActivity();
        setTitle(activity.title);
        setType(activity.type);
        setRoutine(activity.routine);
        setComment(activity.comment);

      } catch (e) {
        console.log("get error: ", e);
      }
    }

    onLoad();
  }, [id]);

  return (
    <div className="Activities">
      <div className="form-container">
        <form>
            <div className="input-div">
                <input value={title} onChange={e => setTitle(e.target.value)} placeholder={title}/>
            </div>
            <div className="input-div">
                <input value={type} onChange={e => setType(e.target.value)} placeholder={type}/>
            </div>
            <div className="input-div">
                <input value={routine} onChange={e => setRoutine(e.target.value)} placeholder={routine}/>
            </div>
            <div className="input-div">
                <input value={comment} onChange={e => setComment(e.target.value)} placeholder={comment}/>
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
        </form>
      </div>
    </div>
  );
}