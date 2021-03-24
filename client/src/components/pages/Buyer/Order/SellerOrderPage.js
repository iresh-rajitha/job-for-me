import { Fragment } from "react";
import { Button, IconButton } from "@material-ui/core";
import { Add, AddCircle } from "@material-ui/icons";
import axios from "axios";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import AddUpdateOrderPopUp from "./AddUpdateOrderPopUp";
import OrderTable from "./SellerOrderTable";
import { spacing } from "@material-ui/system";
import { OrderDetailService } from "../../../../services";
import { useHistory } from "react-router-dom";

import BuyerNav from "../../../layout/BuyerNav";
import Footer from "../../../layout/Footer";

const emails = ["username@gmail.com", "user02@gmail.com"];
const theme = {
  spacing: 8,
};
const initialValues = {
  orderDetailID: 0,
  description: "",
  file: null,
  field: "",
  price: "",
  fileName: "",
};

AddUpdateOrderPopUp.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
  order: PropTypes.object,
};

function SellerOrderpage() {
  let history = useHistory();
  const senderId = history.location.state;
  console.log(senderId);
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
      <BuyerNav />
      <section className="container">
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
            senderId={senderId}
          />
          <OrderTable
            updateFunction={updateFunction}
            deleteFunction={deleteFunction}
            tableData={tableData}
            senderId={history.location.state}
          />
        </div>
      </section>
      <Footer />
    </Fragment>
  );
}
export default SellerOrderpage;
