import React, { useEffect, Fragment } from "react";
import {
  Grid,
  TextField,
  withStyles,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  FormHelperText,
} from "@material-ui/core";
import useForm from "../useForm";
import { connect } from "react-redux";
import * as actions from "../../actions/sellers";
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
  firstName: "",
  lastName: "",
  address: "",
  userType: "",
  category: "",
  email: "",
  password: "",
};

const SellersForm = ({ classes, ...props }) => {
  const { addToast } = useToasts();
  let history = useHistory();
  const buyerId = history.location.state;

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("firstName" in fieldValues)
      temp.firstName = fieldValues.firstName ? "" : "This field is required.";
    if ("lastName" in fieldValues)
      temp.lastName = fieldValues.lastName ? "" : "This field is required.";
    if ("userTpye" in fieldValues)
      temp.userType = fieldValues.userType ? "" : "This field is required.";
    if ("password" in fieldValues)
      temp.password = fieldValues.password ? "" : "This field is required.";
    if ("category" in fieldValues)
      temp.category = fieldValues.category ? "" : "This field is required.";
    if ("email" in fieldValues)
      temp.email = /^$|.+@.+..+/.test(fieldValues.email)
        ? ""
        : "Email is not valid.";
    setErrors({
      ...temp,
    });

    if (fieldValues === values)
      return Object.values(temp).every((x) => x === "");
  };

  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm,
  } = useForm(
    initialFieldValues,
    validate,
    props.setCurrentId,
    props.setOpenPopup
  );

  //material-ui select
  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  const setRole = (fieldValues = values) => {
    fieldValues.userType = "Seller";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setRole();
    if (validate()) {
      // history.push({
      //   pathname: "/sellerdashboard",
      //   state: values.email,
      // });
      const onSuccess = () => {
        resetForm();
        addToast("Submitted successfully", { appearance: "success" });
      };
      props.deleteSeller(buyerId, onSuccess);
      // if (props.sellerList.find((x) => x.email === values.email)) {
      //   props.deleteSeller(buyerId, onSuccess);
      //   props.createSeller(values, onSuccess);
      // } else {
      //   props.createSeller(values, onSuccess);
      // }
      props.createSeller(values, onSuccess);
      // history.push({
      //   pathname: "/sellerdashboard",
      //   state: buyerId,
      // });
      props.sellerList.find((x) => {
        if (x.email == values.email) {
          history.push({
            pathname: "/sellerdashboard",
            state: x.userId,
          });
        }
      });
    }
  };

  useEffect(() => {
    if (props.currentId !== 0) {
      setValues({
        ...props.sellerList.find((x) => x.userId === props.currentId),
      });
      setErrors({});
    }
  }, [props.currentId]);
  return (
    <Fragment>
      {/* <div>
        <div>
          <video
            style={{
              alignItem: "center",
              justifyContent: "center",
              position: "realative",
              zIndex: -1,
              width: "100%",
            }}
            autoPlay="true"
            loop
            muted
            src="https://sg.fiverrcdn.com/packages_lp/cover_video.mp4"
          />
        </div>
      </div> */}

      <section className="container">
        <div>
          <h1 className="large text-primary">Become a Seller!</h1>
          <p className="lead">
            <i className="fas fa-user"></i> Create Your Seller Profile
          </p>
          <p>* This will delete your customer profile!.</p>
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
                name="firstName"
                variant="outlined"
                label="First Name"
                value={values.firstName}
                onChange={handleInputChange}
                {...(errors.firstName && {
                  error: true,
                  helperText: errors.firstName,
                })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="lastName"
                variant="outlined"
                label="Last Name"
                value={values.lastName}
                onChange={handleInputChange}
                {...(errors.lastName && {
                  error: true,
                  helperText: errors.lastName,
                })}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl
                variant="outlined"
                className={classes.formControl}
                {...(errors.category && { error: true })}
              >
                <InputLabel ref={inputLabel}>Category</InputLabel>
                <Select
                  name="category"
                  value={values.category}
                  onChange={handleInputChange}
                  labelWidth={labelWidth}
                >
                  <MenuItem value="">Select a Category</MenuItem>
                  <MenuItem value="illustration">Illustration</MenuItem>
                  <MenuItem value="albumCovers">Album Covers</MenuItem>
                  <MenuItem value="vectorArts">Vector Arts</MenuItem>
                  <MenuItem value="photoEditing">Photo Editing</MenuItem>
                  <MenuItem value="videoEditing">Video Editing</MenuItem>
                  <MenuItem value="uiDesigning">UI Designing</MenuItem>
                </Select>
                {errors.category && (
                  <FormHelperText>{errors.category}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="email"
                variant="outlined"
                label="Email"
                value={values.email}
                onChange={handleInputChange}
                {...(errors.email && { error: true, helperText: errors.email })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="address"
                variant="outlined"
                label="Address"
                value={values.address}
                onChange={handleInputChange}
                {...(errors.address && {
                  error: true,
                  helperText: errors.address,
                })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="password"
                variant="outlined"
                label="Password"
                value={values.password}
                onChange={handleInputChange}
                {...(errors.password && {
                  error: true,
                  helperText: errors.password,
                })}
              />
              <div>{props.currentId}</div>
            </Grid>
            <Grid item xs={12}>
              <div>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  className={classes.smMargin}
                >
                  Submit
                </Button>
                {/* <Button
              variant="contained"
              className={classes.smMargin}
              onClick={resetForm}
            >
              Reset
            </Button> */}
              </div>
            </Grid>
          </Grid>
        </form>
      </section>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  sellerList: state.sellers.list,
});

const mapActionToProps = {
  createSeller: actions.create,
  updateSeller: actions.update,
  deleteSeller: actions.Delete,
  fetchAllSellers: actions.fetchAll,
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(SellersForm));

// import React, { Fragment } from "react";

// import SellerForm from "../SellerForm";

// const Seller = () => {
//   const onSubmit = (e) => {
//     e.preventDefault();
//     console.log("Success");
//   };

//   return (
//     <Fragment>
// <div>
//   <div>
//     <video
//       style={{
//         alignItem: "center",
//         justifyContent: "center",
//         position: "realative",
//         zIndex: -1,
//         width: "100%",
//       }}
//       autoPlay="true"
//       loop
//       muted
//       src={Vid}
//     />
//   </div>
//         <section className="container">
//           <div>
//             <h1 className="large text-primary">Become a Seller!</h1>
//             <p className="lead">
//               <i className="fas fa-user"></i> Create Your Seller Profile
//             </p>
//             <form className="form" onSubmit={(e) => onSubmit(e)}>
//               <SellerForm />
//               <div className="form-group">
//                 <input type="text" placeholder="Name" name="name" required />
//               </div>
//               <div className="form-group">
//                 <input
//                   type="email"
//                   placeholder="Email Address"
//                   name="email"
//                   required
//                 />
//                 <div className="form-group">
//                   <input
//                     type="text"
//                     placeholder="Country"
//                     name="country"
//                     required
//                   />
//                 </div>
//                 <div className="form-group">
//                   <input
//                     type="text"
//                     placeholder="Address"
//                     name="address"
//                     required
//                   />
//                 </div>
//                 <div className="form-group">
//                   <input
//                     type="text"
//                     placeholder="Contact No"
//                     name="contactNo"
//                     required
//                   />
//                 </div>
//                 <div className="form-group">
//                   <input
//                     type="text"
//                     placeholder="Expertise: Illustrator, Photoshop, After Effects or Premere Pro (Type One or more)"
//                     name="expertise"
//                     required
//                   />
//                 </div>
//                 <div className="form-group">
//                   <input
//                     type="text"
//                     placeholder="Work Time: (Select Full Time or Part Time)"
//                     name="workTime"
//                     required
//                   />
//                 </div>
//                 <div className="form-group">
//                   <input
//                     type="text"
//                     placeholder="English Knowledge: (Select Begginer, Average or Expert)"
//                     name="english"
//                     required
//                   />
//                 </div>
//                 <div className="form-group">
//                   <input
//                     type="text"
//                     placeholder="Exam Date: (Select a Date and Time to Participate for the Examination)"
//                     name="exam"
//                     required
//                   />
//                 </div>
//                 <div className="form-group">
//                   <input
//                     type="text"
//                     placeholder="Employed Organizations: (If there is any)"
//                     name="employed"
//                     required
//                   />
//                 </div>
//                 <div className="form-group">
//                   <input
//                     type="text"
//                     placeholder="Experience: (Average or Expert)"
//                     name="experience"
//                     required
//                   />
//                 </div>
//                 <small className="form-text">
//                   This site uses Gravatar so if you want a profile image, use a
//                   Gravatar email
//                 </small>
//               </div>
//               <input type="submit" className="btn btn-primary" value="Submit" />
//             </form>
//           </div>
//         </section>
//       </div>
//     </Fragment>
//   );
// };

// export default Seller;
