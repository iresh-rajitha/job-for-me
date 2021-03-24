import { Fragment } from "react";
import { Button, IconButton } from "@material-ui/core";
import { Add, AddCircle } from "@material-ui/icons";
import axios from "axios";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import AddUpdateOrderPopUp from "./AdminOrderPopup";
import OrderTable from "./AdminOrderTable";
import { spacing } from "@material-ui/system";
import { OrderDetailService } from "../../../../services";

import AdminNav from "../../../layout/AdminNav";
import Footer from "../../../layout/Footer";
import OrderSellers from "../../../OrderSellers";

const emails = ["username@gmail.com", "user02@gmail.com"];
const theme = {
  spacing: 8,
};
const initialValues = {
  orderID: 1,
  startDate: "2021-03-22T12:58:12.166",
  deadline: "2021-01-06T17:16:40",
  comment: "",
  rating: 0,
  description: "Hello there",
  seller: null,
  buyer: null,
  orderDetailID: 5,
  orderDetail: null,
};

AddUpdateOrderPopUp.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
  order: PropTypes.object,
};

function AdminOrderPage() {
  useEffect(() => {
    refreshOrderTable();
  }, []);

  const [tableData, setTableData] = useState([]);
  const [order, setOrder] = useState(initialValues);
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(emails[1]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    console.log("refresh");
    refreshOrderTable();
  };
  const refreshOrderTable = () => {
    axios
      .get("https://localhost:5001/api/order")
      .then((res) => {
        // tableData=res.data;
        setTableData((tableData) => res.data);
        console.log(tableData);
      })
      .catch((err) => {
        console.log(err);
      });

    // OrderDetailService.getAllOrders();
  };
  const deleteFunction = (id) => {
    console.log(id);
    axios
      .delete("https://localhost:5001/api/order/" + id)
      .then((res) => {
        refreshOrderTable();
        console.log(tableData);
      })
      .catch((err) => {
        console.log(err);
      });
    // refreshOrderTable();
  };
  const updateFunction = (obj) => {
    setOrder(obj);
    console.log(obj);
    console.log(order);
    handleClickOpen();
    // refreshOrderTable();
  };

  return (
    <Fragment>
      <AdminNav />
      <section className="container">
        <p> Currently avalible Sellers.</p>
        <OrderSellers />
        <div>
          <IconButton
            mb={10}
            style={{ background: "#3f51b5", color: "white" }}
            aria-label="delete"
            onClick={handleClickOpen}
          >
            <Add />
          </IconButton>
          <AddUpdateOrderPopUp
            selectedValue={selectedValue}
            open={open}
            onClose={handleClose}
            order={order}
          />
          <OrderTable
            updateFunction={updateFunction}
            deleteFunction={deleteFunction}
            tableData={tableData}
          />
        </div>
      </section>
      <Footer />
    </Fragment>
  );
}
export default AdminOrderPage;
