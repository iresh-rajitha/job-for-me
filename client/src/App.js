import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavigationBar from "./components/layout/Navigationbar";
import LandingPage from "./components/layout/Landingpage";
import SellerPage from "./components/pages/Seller";
import OrderPage from "./components/pages/Order";
import AdminPage from "./components/pages/Admin";
import LoginPage from "./components/auth/Loginpage";
import RegisterPage from "./components/auth/Registerpage";
import Footer from "./components/layout/Footer";
import "./App.css";

const App = () => (
  <Router>
    <Fragment>
      <NavigationBar />
      <Route exact path="/" component={LandingPage} />
      <Switch>
        <Route exact path="/register" component={RegisterPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/seller" component={SellerPage} />
        <Route exact path="/order" component={OrderPage} />
        <Route exact path="/admin" component={AdminPage} />
      </Switch>
      <Footer />
    </Fragment>
  </Router>
);

export default App;
