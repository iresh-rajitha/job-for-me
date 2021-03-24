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
  "Illustration",
  "Album Covers",
  "Vector Arts",
  "Photo Editing",
  "Video Editing",
  "UI Designing",
];

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

function AdminOrderPopUp(props) {
  const classes = useStyles();
  const { onClose, selectedValue, open, order } = props;
  const [formData, setFormData] = useState(initialValues);
  const [fieldValue, setFieldValue] = React.useState(fields[0]);
  const [inputValue, setInputValue] = React.useState("");
  const [newOrder, setNewOrder] = useState(
    new Order(0, "2021-01-06T17:16:40", "2021-01-06T17:16:40", "", 0, "", 0)
  );

  const { orderID, deadline, description, seller, buyer } = formData;

  const buyerId = 0;
  const sellerId = 0;

  useEffect(() => {
    setFormData(order);
  }, [order]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    console.log(name + " " + value);
  };

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };
  const handleFile = (e) => {
    console.log(e.target.files);
    formData.file = e.target.files[0];
  };
  const changeField = (e) => {
    formData.field = e.target.value;
  };

  const submit = () => {
    console.log(formData);
    const fd = new FormData();
    fd.append("orderID", formData.orderID);
    fd.append("Description", formData.description);
    fd.append("deadline", formData.deadline);
    fd.append("startDate", formData.startDate);
    fd.append("buyer", new User(buyerId, "", "", "", "", "", ""));
    fd.append("seller", new User(sellerId, "", "", "", "", "", ""));

    if (fd.get("orderID") == 0) {
      axios
        .post("https://localhost:5001/api/order", newOrder)
        .then((res) => {
          console.log(res);
          handleClose();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      // console.log(formData.orderdetailID);
      axios
        .put("https://localhost:5001/api/order/" + fd.get("orderID"), fd)
        .then((res) => {
          console.log(res);
          handleClose();
        })
        .catch((err) => {
          console.log(err);
        });
    }

    // var data = JSON.stringify(newOrder);
    // var config = {
    //   method: 'post',
    //   url: 'https://localhost:5001/api/order',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   data : data
    // };

    // axios(config)
    // .then(function (response) {
    //   console.log(JSON.stringify(response.data));
    // })
    // .catch(function (error) {
    //   console.log(error);
    // });
    // handleClose();
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      open={open}
    >
      <DialogTitle id="form-dialog-title">Add Order</DialogTitle>
      <DialogContent>
        <Grid className={styles.marging_b_15px}>
          <TextField
            className={styles.textArea}
            id="outlined-multiline-static"
            value={description}
            name="description"
            label="Description"
            onChange={(e) => onChange(e)}
            multiline
            rows={3}
            variant="outlined"
          />
        </Grid>
        <Grid className={styles.marging_b_15px}>
          {/* <input 
            type="file"
            value={file}
            name="file"
            variant="outlined"
            onChange={(e) => handleFile(e)}
            /> */}
        </Grid>

        <Grid className={styles.marging_b_15px}>
          {/* <Autocomplete
            value={fieldValue}
            onChange={(event, newValue) => {
              setFieldValue(newValue);
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue);
            }}
            id="controllable-states-demo"
            options={fields}
            style={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Field" variant="outlined" />}
          /> */}
        </Grid>
        <Grid>
          <TextField
            id="date"
            label="Deadline"
            type="date"
            defaultValue={new Date()}
            name="deadline"
            value={deadline}
            onChange={(e) => onChange(e)}
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>

        {/* <Grid className={styles.marging_b_15px}>
          <FormControl fullWidth className={classes.margin}>
            <InputLabel htmlFor="standard-adornment-amount">Amount</InputLabel>
            <Input
              id="standard-adornment-amount"
              value={price}
              name="price"
              onChange={(e) => onChange(e)}
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
            />
          </FormControl>
        </Grid> */}

        <DialogActions>
          <Button onClick={handleClose} variant="contained">
            Cancel
          </Button>
          <Button onClick={submit} variant="contained" color="primary">
            Submit
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}
export default AdminOrderPopUp;
