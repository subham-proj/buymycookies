import React, { useContext } from "react";
import { Switch, Route } from "react-router-dom";
import { Context } from "./context/context";

import Header from "./components/header";
import Login from "./pages/login";
import Register from "./pages/register";
import Dashboard from "./pages/dashboard";
import SellerDashboard from "./pages/sellerDashboard";
import Home from "./pages/home";

function App() {
  const { user } = useContext(Context);

  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/dashboard">
          {user ? (
            user.account_type === "Buyer Only" ||
            user.account_type === "Both" ? (
              <Dashboard />
            ) : (
              "Wrong Gateway"
            )
          ) : (
            <Login />
          )}
        </Route>
        <Route exact path="/seller_dashboard">
          {user ? (
            user.account_type === "Seller Only" ||
            user.account_type === "Both" ? (
              <SellerDashboard />
            ) : (
              "Wrong Gateway"
            )
          ) : (
            <Login />
          )}
        </Route>

        {user ? (
          user.account_type === "Buyer Only" || user.account_type === "Both" ? (
            <Route path="/dashboard" component={Dashboard} />
          ) : (
            <Route path="/seller_dashboard" component={SellerDashboard} />
          )
        ) : (
          <Route exact path="/" component={Home} />
        )}

        <Route path="/">
          {user ? (
            user.account_type === "Buyer Only" ||
            user.account_type === "Both" ? (
              <Dashboard />
            ) : (
              <SellerDashboard />
            )
          ) : (
            <Home />
          )}
        </Route>
      </Switch>
    </div>
  );
}

export default App;
