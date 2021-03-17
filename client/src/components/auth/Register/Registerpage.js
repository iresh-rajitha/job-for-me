import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" to="/">
        JobForMe
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    margin: 0,
    padding: 10,
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  notchedOutline: {
    borderWidth: "1px",
    borderColor: "green !important",
  },
}));

const defaultImageSrc = "https://www.w3schools.com/w3images/avatar2.png";

const initialFieldValues = {
  employeeID: 0,
  employeeName: "",
  occupation: "",
  imageName: "",
  imageSrc: defaultImageSrc,
  imageFile: null,
};

export default function Employee(props) {
  const classes = useStyles();

  const { addOrEdit, recordForEdit } = props;

  const [values, setValues] = useState(initialFieldValues);
  const [errors, setErrors] = useState({});
  const [openPopup, setOpenPopup] = useState(false);

  useEffect(() => {
    if (recordForEdit != null) setValues(recordForEdit);
  }, [recordForEdit]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const showPreview = (e) => {
    if (e.target.files && e.target.files[0]) {
      let imageFile = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (x) => {
        setValues({
          ...values,
          imageFile,
          imageSrc: x.target.result,
        });
      };
      reader.readAsDataURL(imageFile);
    } else {
      setValues({
        ...values,
        imageFile: null,
        imageSrc: defaultImageSrc,
      });
    }
  };

  const validate = () => {
    let temp = {};
    temp.employeeName = values.employeeName == "" ? false : true;
    temp.imageSrc = values.imageSrc == defaultImageSrc ? false : true;
    setErrors(temp);
    return Object.values(temp).every((x) => x == true);
  };

  const resetForm = () => {
    setValues(initialFieldValues);
    document.getElementById("image-uploader").value = null;
    setErrors({});
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const formData = new FormData();
      formData.append("employeeID", values.employeeID);
      formData.append("employeeName", values.employeeName);
      formData.append("occupation", values.occupation);
      formData.append("imageName", values.imageName);
      formData.append("imageFile", values.imageFile);
      addOrEdit(formData, resetForm);
    }
  };

  const applyErrorClass = (field) =>
    field in errors && errors[field] == false ? " invalid-field" : "";

  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}></div>
        <div className={classes.paper}>
          {/* <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography> */}
          <img src="https://dewey.tailorbrands.com/production/brand_version_mockup_image/765/4683342765_f43e76b4-4d93-4f52-b0e7-cc99ad1bf015.png?cb=1613721941" />
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <img src={values.imageSrc} className="card-img-top" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography gutterBottom variant="h5" component="h2">
                  Choose your profile picture.
                </Typography>
                <TextField
                  type="file"
                  variant="outlined"
                  autoComplete="Profile Picture"
                  required
                  fullWidth
                  InputProps={{
                    classes: {
                      notchedOutline: classes.notchedOutline,
                    },
                  }}
                  accept="image/*"
                  className={"form-control-file" + applyErrorClass("imageSrc")}
                  onChange={showPreview}
                  id="image-uploader"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  label="Username"
                  id="username"
                  autoComplete="username"
                  required
                  InputProps={{
                    classes: {
                      notchedOutline: classes.notchedOutline,
                    },
                  }}
                  fullWidth
                  className={"form-control" + applyErrorClass("employeeName")}
                  placeholder="John Doe"
                  name="employeeName"
                  value={values.employeeName}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  id="email"
                  label="Email Address"
                  autoComplete="email"
                  required
                  InputProps={{
                    classes: {
                      notchedOutline: classes.notchedOutline,
                    },
                  }}
                  fullWidth
                  className="form-control"
                  placeholder="user@example.com"
                  name="email"
                  value={values.occupation}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  InputProps={{
                    classes: {
                      notchedOutline: classes.notchedOutline,
                    },
                  }}
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  InputProps={{
                    classes: {
                      notchedOutline: classes.notchedOutline,
                    },
                  }}
                  fullWidth
                  name="password"
                  label="Confirm Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
              </Grid>
              {/* <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid> */}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
      <section className="container">
        <form autoComplete="off" noValidate onSubmit={handleFormSubmit}>
          <img src={values.imageSrc} className="card-img-top" />
          <Typography gutterBottom variant="h5" component="h2">
            Choose your profile picture.
          </Typography>
          <TextField
            type="file"
            variant="standard"
            accept="image/*"
            className={"form-control-file" + applyErrorClass("imageSrc")}
            onChange={showPreview}
            id="image-uploader"
          />
          <br />
          <br />

          <TextField
            variant="outlined"
            className={"form-control" + applyErrorClass("employeeName")}
            placeholder="Employee Name"
            name="employeeName"
            value={values.employeeName}
            onChange={handleInputChange}
          />
          <br />
          <br />

          <TextField
            variant="outlined"
            className="form-control"
            placeholder="Occupation"
            name="occupation"
            value={values.occupation}
            onChange={handleInputChange}
          />
          <Button type="submit" className="btn btn-light">
            Submit
          </Button>
        </form>
      </section>
    </>
  );
}

// import React, { Fragment, useState } from "react";
// import { Link } from "react-router-dom";
// import { connect } from "react-redux";
// import PropTypes from "prop-types";

// import { setAlert } from "./alert";
// import { Register } from "./Register.js";
// import { sendOTPmail } from "./OTPmail";
// import Employee from "../../Employee";

// const Registerpage = () => {
//   const [formData, setFromData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const { name, email, password, confirmPassword } = formData;

//   const onChange = (e) =>
//     setFromData({ ...formData, [e.target.name]: e.target.value });

//   const onSubmit = async (e) => {
//     e.preventDefault();

//     sendOTPmail(email, name);

//     if (password !== confirmPassword)
//       setAlert("Passwords do not match", "danger");
//     else sendOTPmail(email);
//     // else Register(name, email, password, confirmPassword);
//   };

//   return (
//     <section className="container">
//       <Fragment>
//         <h1 className="large text-primary">Sign Up</h1>
//         <p className="lead">
//           <i className="fas fa-user"></i> Create Your Account
//         </p>
//         <form className="form" onSubmit={(e) => onSubmit(e)}>
//           <div className="form-group">
//             <input
//               type="text"
//               placeholder="Name"
//               name="name"
//               value={name}
//               onChange={(e) => onChange(e)}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <input
//               type="email"
//               placeholder="Email Address"
//               name="email"
//               value={email}
//               onChange={(e) => onChange(e)}
//               required
//             />
//             <small className="form-text">
//               This site uses Gravatar so if you want a profile image, use a
//               Gravatar email
//             </small>
//           </div>
//           <div className="form-group">
//             <input
//               type="password"
//               placeholder="Password"
//               name="password"
//               value={password}
//               onChange={(e) => onChange(e)}
//               minLength="6"
//             />
//           </div>
//           <div className="form-group">
//             <input
//               type="password"
//               placeholder="Confirm Password"
//               name="confirmPassword"
//               value={confirmPassword}
//               onChange={(e) => onChange(e)}
//               minLength="6"
//             />
//           </div>
//           <input type="submit" className="btn btn-primary" value="Register" />
//         </form>
//         <p className="my-1">
//           Already have an account? <Link to="/login">Sign In</Link>
//         </p>
//         <Employee />
//       </Fragment>
//     </section>
//   );
// };

// Registerpage.propTypes = {
//   setAlert: PropTypes.func.isRequired,
//   Register: PropTypes.func.isRequired,
//   isAuthenticated: PropTypes.bool,
// };

// const mapStateToProps = (state) => ({
//   isAuthenticated: state.auth.isAuthenticated,
// });

// export default connect(null, { setAlert, Register })(Registerpage);
