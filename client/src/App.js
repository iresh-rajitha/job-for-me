import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavigationBar from "./components/layout/Navigationbar";
import LandingPage from "./components/layout/Landingpage";
import SellerPage from "./components/pages/Seller";
import BuyerPage from "./components/pages/Buyer";
import OrderPage from "./components/pages/Order";
import AdminPage from "./components/pages/Admin";
import LoginPage from "./components/auth/Loginpage";
import RegisterPage from "./components/auth/Registerpage";
import Footer from "./components/layout/Footer"; 
import "./App.css";
import Loginpage from "./components/auth/Loginpage";

// const HandleSuccessFullAuth=(data)=>{
//   console.log(data);
// }
const App = () => (



  <Router>
    <Fragment>

      <NavigationBar />
      <Route exact path="/" component={LandingPage} />
      <Switch>
        <Route  path="/register" >
          <RegisterPage/>
        </Route>
        <Route  path="/login"  >
          <Loginpage />
        </Route>
        <Route  path="/seller"  >
          <SellerPage/>
        </Route>
        <Route  path="/order" >
          <OrderPage/>
        </Route>
        <Route  path="/admin" >
          <AdminPage/>
        </Route>
        <Route  path="/buyer"> 
        {/* above component should be outside */}
          <BuyerPage/>
        </Route>
      </Switch>
      <Footer />
    </Fragment>
  </Router>
);




export default App;
