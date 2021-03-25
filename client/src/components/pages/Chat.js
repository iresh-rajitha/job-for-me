import React, { useEffect, useState, Fragment } from "react";
import axios from "axios";
import { Grid, TextField, withStyles, Button } from "@material-ui/core";
// import useForm from "../useeForm";
import { connect } from "react-redux";
import * as actions from "../../actions/messages";
import { useToasts } from "react-toast-notifications";
import { useHistory } from "react-router-dom";

const styles = (theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      minWidth: "100%",
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: "100%",
  },
  smMargin: {
    margin: theme.spacing(1),
  },
});

const initialFieldValues = {
  messageID: 0,
  to: 0,
  from: 0,
  text: "",
};

const MessagesForm = ({ classes, ...props }) => {
  const [values, setValues] = useState(initialFieldValues);
  const [errors, setErrors] = useState({});
  const { addToast } = useToasts();
  let history = useHistory();
  console.log("from " + props.senderId);
  console.log("to " + props.recieverId);

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("text" in fieldValues)
      temp.text = fieldValues.text ? "" : "This field is required.";
    setErrors({
      ...temp,
    });

    if (fieldValues === values)
      return Object.values(temp).every((x) => x === "");
  };

  // const {
  //   values,
  //   setValues,
  //   errors,
  //   setErrors,
  //   handleInputChange,
  //   resetForm,
  // } = useForm(initialFieldValues, validate, props.setCurrentId);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const fieldValue = { [name]: value };
    setValues({
      ...values,
      ...fieldValue,
    });
    validate(fieldValue);
  };

  const resetForm = () => {
    setValues({
      ...initialFieldValues,
    });
    setErrors({});
  };

  const setRecieverId = (fieldValues = values) => {
    fieldValues.to = props.recieverId;
  };

  const setSenderId = (fieldValues = values) => {
    fieldValues.from = props.senderId;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSenderId();
    setRecieverId();
    if (validate()) {
      const onSuccess = () => {
        resetForm();
        addToast("Submitted successfully", { appearance: "success" });
      };
      if (props.currentId === 0) {
        props.createMessage(values, onSuccess());
        props.fetchAllMessages();
        // var data = JSON.stringify({
        //   to: 25,
        //   from: 30,
        //   text: "Hi, how are you?",
        // });

        // var config = {
        //   method: "post",
        //   url: "https://localhost:5001/api/message",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   data: values,
        // };

        // axios(config)
        //   .then(function (response) {
        //     console.log(JSON.stringify(response.data));
        //   })
        //   .catch(function (error) {
        //     console.log(error);
        //   });
      } else {
        props.updateMessage(props.currentId, values, onSuccess());
        props.fetchAllMessages();
        // var config = {
        //   method: "put",
        //   url: "https://localhost:5001/api/message/" + props.currentId,
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   data: values,
        // };

        // axios(config)
        //   .then(function (response) {
        //     console.log(JSON.stringify(response.data));
        //   })
        //   .catch(function (error) {
        //     console.log(error);
        //   });
      }
    }
  };

  useEffect(() => {
    if (props.currentId !== 0) {
      setValues({
        ...props.messageList.find((x) => x.messageId === props.currentId),
      });
      setErrors({});
      props.fetchAllMessages();
    }
  }, [props.currentId]);

  return (
    <Fragment>
      <section className="container">
        <div>
          <h1 className="large text-primary">Chat with your Seller!</h1>
          <p className="lead">
            <i className="fas fa-user"></i> Add you message in the below box
          </p>
        </div>
        <form
          autoComplete="off"
          noValidate
          className={classes.root}
          onSubmit={handleSubmit}
        >
          <Grid container>
            <Grid item xs={12}>
              <TextField
                name="text"
                variant="outlined"
                label="Message"
                value={values.text}
                onChange={handleInputChange}
                {...(errors.text && {
                  error: true,
                  helperText: errors.text,
                })}
              />
            </Grid>
            <Grid item xs={12}>
              <div>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  className={classes.smMargin}
                >
                  Send
                </Button>
              </div>
            </Grid>
          </Grid>
        </form>
      </section>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  messageList: state.messages.list,
});

const mapActionToProps = {
  createMessage: actions.create,
  updateMessage: actions.update,
  fetchAllMessages: actions.fetchAll,
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(MessagesForm));
