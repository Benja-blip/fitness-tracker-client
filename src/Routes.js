import React from "react";
import { Route, Switch } from "react-router-dom";
import AppliedRoute from "./components/AppliedRoute";
import Home from "./containers/Home";
import Login from "./containers/Login";
import NotFound from "./containers/NotFound";
import Signup from "./containers/Signup";
import NewActivity from "./containers/NewActivity";
import EditActivity from "./containers/EditActivity";
import TimeForm from "./containers/TimeForm";

export default function Routes({ appProps }) {
  return (
    <Switch>
      <AppliedRoute path="/" exact component={Home} appProps={appProps} />
      <AppliedRoute path="/login" exact component={Login} appProps={appProps} />
      <AppliedRoute path="/signup" exact component={Signup} appProps={appProps} />
      <AppliedRoute path="/activities/new" exact component={NewActivity} appProps={appProps} />
      <AppliedRoute path="/" exact component={EditActivity} appProps={appProps} />
      <AppliedRoute path="/" exact component={TimeForm} appProps={appProps} />
      <Route component={NotFound} />
    </Switch>
  );
}