import React, { Fragment } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ToastProvider } from 'react-toast-notifications'

import LandingPage from './screens/LandingPage'
import LoginPage from './screens/LoginPage'
import RegisterPage from './screens/RegisterPage'
import ContactUsPage from './screens/ContactUsPage'

import BuyerChat from './screens/BuyerChatScreen'

import AdminPage from './screens/AdminLandingPage'
import Buyers from './screens/AdminBuyersList'
import Sellers from './screens/AdminSellersList'
import Admins from './screens/AdminAdminsList'
import AdminOrders from './screens/AdminOrdersList'
import AdminProfile from './screens/AdminProfile'
import AdminRegister from './screens/AdminRegister'

import OrderPage from './screens/BuyerLandingPage'
import YourOrdersBuyer from './screens/BuyerOrdersList'
import Seller from './screens/BuyerToSeller'
import BuyerProfile from './screens/BuyerProfile'
import Payment from './screens/BuyerPayment'
import BuyerContactUs from './screens/BuyerContactUs'

import SellerDashboard from './screens/SellerLandingPage'
import SellerProfile from './screens/SellerProfile'
import YourOrdersSeller from './screens/SellerOrderList'
import SellerContactUs from './screens/SellerContactUs'
import SellerChat from './screens/SellerChatScreen'

import './App.css'

import store from './store'

const App = () => (
  <Provider store={store}>
    <ToastProvider autoDismiss={true}>
      <Router>
        <Fragment>
          <section className='landing-app'>
            <Switch>
              <Route exact path='/' component={LandingPage} />
              <Route path='/login' component={LoginPage} />
              <Route path='/register' component={RegisterPage} />
              <Route path='/contact' component={ContactUsPage} />
              <Route path='/admin' component={AdminPage} exact />
              <Route path='/order' component={OrderPage} />
              <Route path='/sellerdashboard' component={SellerDashboard} />
              <Route path='/buyers' component={Buyers} />
              <Route path='/sellers' component={Sellers} />
              <Route path='/admins' component={Admins} />
              <Route path='/adminorders' component={AdminOrders} />
              <Route path='/adminprofile' component={AdminProfile} />
              <Route path='/yourorders' component={YourOrdersBuyer} />
              <Route path='/seller' component={Seller} />
              <Route path='/buyerprofile' component={BuyerProfile} />
              <Route path='/buyerchat' component={BuyerChat} />
              <Route path='/payment' component={Payment} />
              <Route path='/sellerprofile' component={SellerProfile} />
              <Route path='/yourordersseller' component={YourOrdersSeller} />
              <Route path='/buyercontact' component={BuyerContactUs} />
              <Route path='/sellercontact' component={SellerContactUs} />
              <Route path='/sellerchat' component={SellerChat} />
              <Route path='/adminregister' component={AdminRegister} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </ToastProvider>
  </Provider>
)

export default App
