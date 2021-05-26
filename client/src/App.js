import React, { Fragment } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ToastProvider } from 'react-toast-notifications'

import LandingPage from './screens/LandingPage'
import LoginPage from './screens/LoginPage'
import RegisterPage from './screens/RegisterPage'
import ContactUs from './screens/ContactUsPage'

import Chat from './screens/ChatScreen'

import AdminPage from './screens/AdminLandingPage'
import Buyers from './screens/AdminBuyersList'
import Sellers from './screens/AdminSellersList'
import Admins from './screens/AdminAdminsList'
import AdminOrders from './screens/AdminOrdersList'
import AdminProfile from './screens/AdminProfile'

import OrderPage from './screens/BuyerLandingPage'
import YourOrdersBuyer from './screens/BuyerOrdersList'
import Seller from './screens/BuyerToSeller'
import BuyerProfile from './screens/BuyerProfile'
import Payment from './screens/BuyerPayment'

import SellerDashboard from './screens/SellerLandingPage'
import SellerProfile from './screens/SellerProfile'
import YourOrdersSeller from './screens/SellerOrderList'

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
              <Route path='/contact' component={ContactUs} />
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
              <Route path='/chat' component={Chat} />
              <Route path='/payment' component={Payment} />
              <Route path='/sellerprofile' component={SellerProfile} />
              <Route path='/yourordersseller' component={YourOrdersSeller} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </ToastProvider>
  </Provider>
)

export default App
