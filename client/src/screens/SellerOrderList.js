import axios from 'axios'
import React, { useEffect, useState, Fragment } from 'react'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'

import { IconButton } from '@material-ui/core'
import { Add } from '@material-ui/icons'

import AddUpdateOrderPopUp from '../components/AddUpdateOrderPopUp'
import SellerNav from '../components/SellerNav'
import Footer from '../components/Footer'
import SellerOrderTable from '../components/SellerOrderTable'
import SellerGigList from '../components/SellerGigList'

const emails = ['username@gmail.com', 'user02@gmail.com']

const initialValues = {
  orderDetailID: 0,
  description: '',
  file: null,
  field: '',
  price: '',
  fileName: '',
}

AddUpdateOrderPopUp.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
  order: PropTypes.object,
}

function SellerOrderpage() {
  let history = useHistory()
  const sellerId = history.location.state

  const senderId = history.location.state
  console.log(senderId)

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
        setTableData((tableData) => res.data)
        console.log(tableData)
      })
      .catch((err) => {
        console.log(err)
      })
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
  }
  const updateFunction = (obj) => {
    setOrder(obj)
    console.log(obj)
    console.log(order)
    handleClickOpen()
  }

  return (
    <Fragment>
      <SellerNav {...{ sellerId }} />
      <section className='container'>
        <div>
          <AddUpdateOrderPopUp
            selectedValue={selectedValue}
            open={open}
            onClose={handleClose}
            order={order}
            senderId={senderId}
          />
          <SellerOrderTable
            updateFunction={updateFunction}
            deleteFunction={deleteFunction}
            tableData={tableData}
            senderId={history.location.state}
          />
          <SellerGigList
            sellerId={sellerId}
            senderId={history.location.state}
          />
        </div>
      </section>
      <Footer />
    </Fragment>
  )
}
export default SellerOrderpage
