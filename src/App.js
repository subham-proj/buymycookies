import React, { useContext } from "react";
import { Switch, Route } from "react-router-dom";

// Context API for session authentication
import { Context } from "./context/context";

// All the Components/pages
import Header from "./components/header";

import Login from "./pages/auth/login";
import Register from "./pages/auth/register";

import SinglePost from "./pages/singlePosts/singlePost";

import Profile from "./pages/profile";

import Dashboard from "./pages/dashboards/dashboard";
import SellerDashboard from "./pages/dashboards/sellerDashboard";

import ManageOrders from "./pages/orders/manageOrders";
import Orders from "./pages/orders/myorders";

import AddProduct from "./pages/addProduct";

import Error from "./pages/error/error";
import Home from "./pages/home";

function App() {
  const { user } = useContext(Context);

  return (
    <div>
      <Header />
      <Switch>
        <Route path="/posts" component={SinglePost} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />

        {/** Conditional Routing for session's user authentication */}

        {/** Show Dashboard to place a bid to users having either "Buyer only" or "Both" authorization */}

        <Route exact path="/dashboard">
          {user ? (
            user.account_type === "Buyer Only" ||
            user.account_type === "Both" ? (
              <Dashboard />
            ) : (
              <Error />
            )
          ) : (
            <Login />
          )}
        </Route>

        {/** Show Seller Dashboard to users having "Seller only" authorization */}

        <Route path="/seller_dashboard">
          {user ? (
            user.account_type === "Seller Only" ? (
              <SellerDashboard />
            ) : (
              <Error />
            )
          ) : (
            <Login />
          )}
        </Route>

        {/** User having "Seller Only" or "Both" authorization will be able to add product for sale */}

        <Route exact path="/add_product">
          {user ? (
            user.account_type === "Seller Only" ||
            user.account_type === "Both" ? (
              <AddProduct />
            ) : (
              <Error />
            )
          ) : (
            <Login />
          )}
        </Route>

        {/** if the session has logged in user, he/she can navigate 
        to his/her profile otherwise will be directed to login page */}

        {user ? (
          <Route path={`/users/@/${user.username}`}>
            {user ? <Profile /> : <Login />}
          </Route>
        ) : (
          ""
        )}

        {/** Since Seller cannot make an order so, My Order page will be visible 
        to users having "Buyer only" or "Both" authorization */}

        <Route exact path="/orders">
          {user ? (
            user.account_type === "Buyer Only" ||
            user.account_type === "Both" ? (
              <Orders />
            ) : (
              <Error />
            )
          ) : (
            <Login />
          )}
        </Route>

        {/** Users who can add product can Manage the orders also */}

        <Route exact path="/manage_orders">
          {user ? (
            user.account_type === "Seller Only" ||
            user.account_type === "Both" ? (
              <ManageOrders />
            ) : (
              <Error />
            )
          ) : (
            <Login />
          )}
        </Route>

        {/** The base path will be Dashboard or Seller Dashboard if session has a 
        logged in user otherwise it will be directed to the landing page*/}

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
