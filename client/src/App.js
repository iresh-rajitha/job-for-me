import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavigationBar from "./components/layout/Navigationbar";
import LandingPage from "./components/layout/Landingpage";
import SellerPage from "./components/pages/Seller";
import BuyerPage from "./components/pages/Buyer/Buyer";
import OrderPage from "./components/pages/Order";
import Loginpage from "./components/auth/Login/Loginpage";
import RegisterPage from "./components/auth/Register/Registerpage";
import ContactUs from "./components/pages/ContactUs";
import Footer from "./components/layout/Footer";
import "./App.css";
import { Provider } from "react-redux";
import store from "./store";
import Admin from "./components/pages/Admin/Admin";

const HandleSuccessFullAuth=(data)=>{
  console.log(data);
}
const App = () => (
  <Provider store={store}>
    <Router>
      <Fragment>
        
        <Switch>
          <Route exact path="/">
            <NavigationBar/>
            <LandingPage />
            <Footer />
          </Route>
          <Route path="/register">
            <NavigationBar/>
            <RegisterPage />
            <Footer />
          </Route>
          <Route path="/login">
            <NavigationBar/>
            <Loginpage  />
            <Footer />
          </Route>
          <Route path="/seller">
            <NavigationBar/>
            <SellerPage />
            <Footer />
          </Route>
          <Route path="/order">
            <NavigationBar/>
            <OrderPage />
            <Footer />
          </Route>
          <Route path="/admin">
            <Admin/>
          </Route>
          <Route path="/contact">
            <ContactUs />
          </Route>
          <Route path="/buyer">
            <BuyerPage />
          </Route>
        </Switch>
        
      </Fragment>
    </Router>
  </Provider>
);

export default App;
