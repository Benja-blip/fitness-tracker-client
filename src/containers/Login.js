import React, { useState } from "react";
import { Auth } from "aws-amplify";
import LoaderButton from "../components/LoaderButton";
import { useFormFields } from "../libs/hooksLib";
import "./Login.css";

export default function Login(props) {
    const [isLoading, setIsLoading] = useState(false);
    const [fields, handleFieldChange] = useFormFields({
        email: "",
        password: ""
    });

    function validateForm() {
        return fields.email.length > 0 && fields.password.length > 0;
    }

    async function handleSubmit(event) {
        event.preventDefault();

        setIsLoading(true);

        try {
            await Auth.signIn(fields.email, fields.password);
            props.userHasAuthenticated(true);
            props.history.push("/");
        } catch (e) {
            alert(e.message);
            setIsLoading(false);
        }
    }

    return(
        <div className="Login">
            <form onSubmit={handleSubmit}>
                <input
                    autoFocus
                    placeholder="Email"
                    type="email"
                    value={fields.email}
                    onChange={handleFieldChange}
                />
                <input
                    placeholder="Password"
                    value={fields.password}
                    onChange={handleFieldChange}
                    type="password"
                />
                <LoaderButton
                  block
                  type="submit"
                  bsSize="small"
                  isLoading={isLoading}
                  disabled={!validateForm()}
                >
                  Login
                </LoaderButton>
            </form>
        </div>
    );
}