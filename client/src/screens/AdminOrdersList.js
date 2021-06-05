import axios from 'axios'
import { Fragment } from 'react'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'

import AddUpdateOrderPopUp from '../components/AdminOrderPopup'
import OrderTable from '../components/AdminOrderTable'
import AdminNav from '../components/AdminNav'
import Footer from '../components/Footer'
import OrderSellers from '../components/SellersList'
import GigsList from '../components/GigsList'

const emails = ['username@gmail.com', 'user02@gmail.com']

const initialValues = {
  orderID: 1,
  startDate: '2021-03-22T12:58:12.166',
  deadline: '2021-01-06T17:16:40',
  comment: '',
  rating: 0,
  description: 'Hello there',
  seller: null,
  buyer: null,
  orderDetailID: 5,
  orderDetail: null,
}

AddUpdateOrderPopUp.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
  order: PropTypes.object,
}

function AdminOrderPage() {
  const history = useHistory()
  const adminId = history.location.state

  useEffect(() => {
    if (!history.location.state) {
      history.push('/login')
    }
    refreshOrderTable()
  }, [history.location.state])

  const [tableData, setTableData] = useState([])
  const [order, setOrder] = useState(initialValues)
  const [open, setOpen] = React.useState(false)
  const [selectedValue, setSelectedValue] = React.useState(emails[1])

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = (value) => {
    setOpen(false)
    console.log('refresh')
    refreshOrderTable()
  }
  const refreshOrderTable = () => {
    axios
      .get('https://localhost:5001/api/order')
      .then((res) => {
        // tableData=res.data;
        setTableData((tableData) => res.data)
        console.log(tableData)
      })
      .catch((err) => {
        console.log(err)
      })

    // OrderDetailService.getAllOrders();
  }
  const deleteFunction = (id) => {
    console.log(id)
    axios
      .delete('https://localhost:5001/api/order/' + id)
      .then((res) => {
        refreshOrderTable()
        console.log(tableData)
      })
      .catch((err) => {
        console.log(err)
      })
    // refreshOrderTable();
  }
  const updateFunction = (obj) => {
    setOrder(obj)
    console.log(obj)
    console.log(order)
    handleClickOpen()
    // refreshOrderTable();
  }

  return (
    <Fragment>
      <AdminNav {...{ adminId }} />
      <section className='container'>
        <p> Currently avalible Sellers.</p>
        {/* <OrderSellers /> */}
        <GigsList />
        {/* <div>
          <AddUpdateOrderPopUp
            selectedValue={selectedValue}
            refreshOrderTable={refreshOrderTable}
            open={open}
            onClose={handleClose}
            order={order}
          />
          <OrderTable
            updateFunction={updateFunction}
            deleteFunction={deleteFunction}
            refreshOrderTable={refreshOrderTable}
            tableData={tableData}
          />
        </div> */}
      </section>
      <Footer />
    </Fragment>
  )
}
export default AdminOrderPage
