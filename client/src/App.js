import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavigationBar from "./components/layout/Navigationbar";
import LandingNav from "./components/layout/LandingNav";
import LandingPage from "./components/layout/Landingpage";
import SellerPage from "./components/pages/Seller";
import BuyerPage from "./components/pages/Buyer";
import OrderPage from "./components/pages/Order";
import AdminPage from "./components/pages/Admin";
import LoginPage from "./components/pages/Login";
//import Loginpage from "./components/auth/Login/Loginpage";
import SellerDashboard from "./components/pages/SellerDashboard";
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
import Buyers from "./components/Buyers";
import Admins from "./components/Admins";
import AddanAdmin from "./components/pages/AddanAdmin";
import BuyerProfile from "./components/BuyerProfile";
import SellerProfile from "./components/SellerProfile";
import AdminProfile from "./components/AdminProfile";
import Buyer from "./components/pages/Buyer/Buyer";
import YourOrders from "./components/pages/Buyer/Order/Orderpage";

const App = () => (
  <Provider store={store}>
    <ToastProvider autoDismiss={true}>
      <Router>
        <Fragment>
          {/* <LandingNav /> */}
          <Route exact path="/" component={LandingPage} />
          <Switch>
            <Route path="/register">
              <BuyerPage />
            </Route>
            <Route path="/login">
              <LoginPage />
            </Route>
            <Route path="/seller">
              <Seller />
            </Route>
            <Route path="/order">
              <OrderPage />
            </Route>
            <Route exact path="/admin" component={AdminPage} />
            {/* <Route path="/admin">
              <AdminPage />
            </Route> */}
            <Route path="/contact">
              <ContactUs />
            </Route>
            <Route path="/buyers">
              <Buyers />
            </Route>
            <Route path="/sellerdashboard">
              <SellerDashboard />
            </Route>
            <Route path="/sellerprofile">
              <SellerProfile />
            </Route>
            <Route path="/admins">
              <Admins />
            </Route>
            <Route path="/addanadmin">
              <AddanAdmin />
            </Route>
            <Route path="/adminprofile">
              <AdminProfile />
            </Route>
            <Route path="/yourorders">
              <YourOrders />
            </Route>
            <Route path="/sellers">
              {/* above component should be outside */}
              <Sellers />
            </Route>
            <Route path="/buyerprofile">
              {/* above component should be outside */}
              <BuyerProfile />
            </Route>
          </Switch>
          {/* <Footer /> */}
        </Fragment>
      </Router>
    </ToastProvider>
  </Provider>
);

export default App;
