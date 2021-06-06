import { Fragment } from 'react'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

import { Grid, Button } from '@material-ui/core'

import BuyerGigForm from '../components/BuyerGigForm'
import BuyerGigList from '../components/BuyerGigList'
// import PropTypes from 'prop-types'
import BuyerNav from '../components/BuyerNav'
import Footer from '../components/Footer'
import Popup from '../components/Popup'

// const emails = ['username@gmail.com', 'user02@gmail.com']

// const initialValues = {
//   orderDetailID: 0,
//   description: '',
//   file: null,
//   field: '',
//   price: '',
//   fileName: '',
// }

// AddUpdateOrderPopUp.propTypes = {
//   onClose: PropTypes.func.isRequired,
//   open: PropTypes.bool.isRequired,
//   selectedValue: PropTypes.string.isRequired,
//   order: PropTypes.object,
// }

function Orderpage() {
  let history = useHistory()
  const senderId = history.location.state
  const buyerId = history.location.state
  const [currentId, setCurrentId] = useState(0)
  const [openPopup, setOpenPopup] = useState(false)
  const [userId, setUserId] = useState(false)
  console.log(senderId)

  useEffect(() => {
    if (!history.location.state) {
      history.push('/login')
    }
    // refreshOrderTable()
  }, [history.location.state])

  // const [tableData, setTableData] = useState([])
  // const [order, setOrder] = useState(initialValues)
  // const [open, setOpen] = React.useState(false)
  // const [selectedValue, setSelectedValue] = React.useState(emails[1])

  // const handleClickOpen = () => {
  //   setOpen(true)
  // }

  // const handleClose = (value) => {
  //   setOpen(false)
  //   console.log('refresh')
  //   refreshOrderTable()
  // }
  // const refreshOrderTable = () => {
  //   axios
  //     .get('https://localhost:5001/api/order')
  //     .then((res) => {
  //       // tableData=res.data;
  //       setTableData((tableData) => res.data)
  //       console.log(tableData)
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //     })

  //   // OrderDetailService.getAllOrders();
  // }
  // const deleteFunction = (id) => {
  //   console.log(id)
  //   axios
  //     .delete('https://localhost:5001/api/orderdetail/' + id)
  //     .then((res) => {
  //       refreshOrderTable()
  //       console.log(tableData)
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //     })
  //   // refreshOrderTable();
  // }
  // const updateFunction = (obj) => {
  //   setOrder(obj)
  //   console.log(obj)
  //   console.log(order)
  //   handleClickOpen()
  //   // refreshOrderTable();
  // }

  // const handleAdd = () => {
  //   setOpen(true)
  // }

  const openGigForm = () => {
    if (!history.location.state) {
      history.push('/login')
    }
    setUserId(history.location.state)
    setOpenPopup(true)
  }
  return (
    <Fragment>
      <BuyerNav {...{ buyerId }} />
      <section className='container'>
        <div>
          {/* <AddUpdateOrderPopUp
            selectedValue={selectedValue}
            open={open}
            onClose={handleClose}
            order={order}
            senderId={senderId}
          />
          <BuyerOrderTable
            updateFunction={updateFunction}
            deleteFunction={deleteFunction}
            tableData={tableData}
            senderId={history.location.state}
          /> */}
          <Popup
            title='Add an Order'
            openPopup={openPopup}
            setOpenPopup={setOpenPopup}
          >
            <BuyerGigForm
              {...{ userId, currentId, setCurrentId, setOpenPopup }}
            />
          </Popup>
          <BuyerGigList buyerId={buyerId} senderId={history.location.state} />
          <Grid container justify='flex-end'>
            <Button onClick={openGigForm} variant='contained' color='primary'>
              Place another order!
            </Button>
          </Grid>
        </div>
      </section>
      <Footer />
    </Fragment>
  )
}
export default Orderpage
