import React, { useState, useEffect } from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import { blue } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Container,
  DialogActions,
  DialogContent,
  Grid,
  TextField,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import styles from "./AddUpdateOrderPopUp.module.css";
import axios from "axios";
import Order from "../../../../models/order.model";
import User from "../../../../models/user.model";

const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});
const fields = [
  "None",
  "The Graphic Design",
  "Technology",
  "Web Design Design",
  "Illustrator",
  "Data Entry",
  "Data Analysis",
  "Ecommerce",
];

const initialValues = {
  sellerId: 0,
};

function AddUpdateOrderPopUp(props) {
  const orderId = props.orderId;
  console.log(orderId);
  //   const classes = useStyles();
  //   const { onClose, selectedValue, open, order, senderId } = props;
  const [formData, setFormData] = useState(initialValues);
  //   const [fieldValue, setFieldValue] = React.useState(fields[0]);
  //   const [inputValue, setInputValue] = React.useState("");
  //   const [newOrder, setNewOrder] = useState(
  //     new Order(
  //       0,
  //       "2021-01-06T17:16:40",
  //       "2021-01-06T17:16:40",
  //       "",
  //       0,
  //       "",
  //       0,
  //       0,
  //       0
  //     )
  //   );

  const { sellerId } = formData;

  //   useEffect(() => {
  //     setFormData(order);
  //     console.log(props.senderId);
  //   }, [order]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    console.log(name + " " + value);
  };

  const submit = async () => {
    var config = {
      method: "get",
      url: "https://localhost:5001/api/order/" + orderId,
      headers: {},
    };

    const res = await axios(config)
      .then(function (response) {
        console.log(response.data);
        return response.data;
        // response.data.to = formData.sellerId;
        // const values = response.data;

        // const data = {
        //   method: "put",
        //   url: "https://localhost:5001/api/order/" + orderId,
        //   headers: { values },
        // };

        // axios(data)
        //   .then(function (response) {
        //     console.log(JSON.stringify(response.data));
        //   })
        //   .catch(function (error) {
        //     console.log(error);
        //   });
      })
      .catch(function (error) {
        console.log(error);
      });

    console.log(res);
    res.to = Number(formData.sellerId);
    console.log(res);

    const details = JSON.stringify(res);

    const data = {
      method: "put",
      url: "https://localhost:5001/api/order/" + orderId,
      headers: {
        "Content-Type": "application/json",
      },
      data: details,
    };

    axios(data)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        props.setOpenPopup(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  //   const handleClose = () => {
  //     onClose(selectedValue);
  //   };

  //   const handleListItemClick = (value) => {
  //     onClose(value);
  //   };
  //   const handleFile = (e) => {
  //     console.log(e.target.files);
  //     formData.file = e.target.files[0];
  //   };
  //   const changeField = (e) => {
  //     formData.field = e.target.value;
  //   };

  //   const submit = () => {
  //     console.log(formData);
  //     const fd = new FormData();
  //     fd.append("orderDetailID", formData.orderDetailID);
  //     fd.append("Description", formData.description);
  //     fd.append("File", formData.file);
  //     fd.append("Field", formData.field);
  //     fd.append("Price", formData.price);
  //     fd.append("FileName", formData.fileName);

  //     newOrder.startDate = new Date().toISOString();
  //     newOrder.deadline = formData.deadline;
  //     formData.price = parseFloat(formData.price);
  //     newOrder.orderDetail = formData;
  //     newOrder.description = formData.description;
  //     console.log(props.senderId);
  //     newOrder.from = props.senderId;
  //     // newOrder.buyer = new User(props.senderId, "", "", "", "", "", "");
  //     console.log(newOrder);
  //     if (fd.get("orderDetailID") == 0) {
  //       axios
  //         .post("https://localhost:5001/api/order", newOrder)
  //         .then((res) => {
  //           console.log(res);
  //           handleClose();
  //         })
  //         .catch((err) => {
  //           console.log(err);
  //         });
  //     } else {
  //       // console.log(formData.orderdetailID);
  //       axios
  //         .put(
  //           "https://localhost:5001/api/OrderDetail/" + fd.get("orderDetailID"),
  //           fd
  //         )
  //         .then((res) => {
  //           console.log(res);
  //           handleClose();
  //         })
  //         .catch((err) => {
  //           console.log(err);
  //         });
  //     }
  //   };

  return (
    <section>
      <Grid className={styles.marging_b_15px}>
        <TextField
          className={styles.textArea}
          id="outlined-multiline-static"
          value={sellerId}
          name="sellerId"
          label="sellerId"
          onChange={(e) => onChange(e)}
          multiline
          rows={3}
          variant="outlined"
        />
      </Grid>
      <Grid className={styles.marging_b_15px}>
        <Button onClick={submit} variant="contained" color="primary">
          Submit
        </Button>
      </Grid>
    </section>
  );
}
export default AddUpdateOrderPopUp;
