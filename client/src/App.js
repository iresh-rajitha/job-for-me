import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavigationBar from "./components/layout/Navigationbar";
import LandingPage from "./components/layout/Landingpage";
import SellerPage from "./components/pages/Seller";
import BuyerPage from "./components/pages/Buyer";
import OrderPage from "./components/pages/Order";
import AdminPage from "./components/pages/Admin";
import Loginpage from "./components/auth/Login/Loginpage";
import RegisterPage from "./components/auth/Register/Registerpage";
import ContactUs from "./components/pages/ContactUs";
import Footer from "./components/layout/Footer";
import "./App.css";
import { Provider } from "react-redux";
import store from "./store";
import Seller from "./components/pages/Seller";
import EmployeeList from "./components/EmployeeList";
import { ToastProvider } from "react-toast-notifications";
import Sellers from "./components/Sellers";

const App = () => (
  <Provider store={store}>
    <ToastProvider autoDismiss={true}>
      <Router>
        <Fragment>
          <NavigationBar />
          <Route exact path="/" component={LandingPage} />
          <Switch>
            <Route path="/register">
              <RegisterPage />
            </Route>
            <Route path="/login">
              <Loginpage />
            </Route>
            <Route path="/seller">
              <Seller />
            </Route>
            <Route path="/order">
              <OrderPage />
            </Route>
            <Route path="/admin">
              <AdminPage />
            </Route>
            <Route path="/contact">
              <ContactUs />
            </Route>
            <Route path="/employee">
              <EmployeeList />
            </Route>
            <Route path="/buyer">
              {/* above component should be outside */}
              <Sellers />
            </Route>
          </Switch>
          <Footer />
        </Fragment>
      </Router>
    </ToastProvider>
  </Provider>
);

export default App;
