import React from "react";
import { Switch, Route } from "react-router-dom";
import Header from "./components/header";
import Login from "./pages/login";
import Registration from "./pages/register";
import Home from "./pages/home";

function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/register" component={Registration} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/" component={Home} />
      </Switch>
    </div>
  );
}

export default App;
