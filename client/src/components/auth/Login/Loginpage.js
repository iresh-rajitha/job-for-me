import React from "react";
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
      <Link color="inherit" href="https://material-ui.com/">
        JobForMe
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  notchedOutline: {
    borderWidth: "1px",
    borderColor: "green !important",
  },
}));

export default function Loginpage() {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}></div>
      <div className={classes.paper}>
        {/* <Avatar
          className={classes.avatar}
          alt="JobForMe"
          src="https://dewey.tailorbrands.com/production/brand_version_mockup_image/765/4683342765_f43e76b4-4d93-4f52-b0e7-cc99ad1bf015.png?cb=1613721941"
        >
          <LockOutlinedIcon />
        </Avatar> */}
        <img src="https://dewey.tailorbrands.com/production/brand_version_mockup_image/765/4683342765_f43e76b4-4d93-4f52-b0e7-cc99ad1bf015.png?cb=1613721941" />
        {/* <Typography component="h1" variant="h5">
          Sign in
        </Typography> */}
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            InputProps={{
              classes: {
                notchedOutline: classes.notchedOutline,
              },
            }}
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            InputProps={{
              classes: {
                notchedOutline: classes.notchedOutline,
              },
            }}
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

// import React, { Fragment, useState } from "react";
// import { Link, Redirect } from "react-router-dom";
// import { connect } from "react-redux";
// import PropTypes from "prop-types";

// import { login } from "./Login";

// const Loginpage = ({ login, isAuthenticated, user }) => {
//   const [formData, setFromData] = useState({
//     email: "",
//     password: "",
//   });

//   const { email, password } = formData;

//   const onChange = (e) =>
//     setFromData({ ...formData, [e.target.name]: e.target.value });

//   const onSubmit = async (e) => {
//     e.preventDefault();

//     login(email, password);
//   };

//   if (isAuthenticated) {
//     if (user.role === "Customer") return <Redirect to="/order" />;
//     else console.log(user.role);
//   }

//   return (
//     <section className="container">
//       <Fragment>
//         <h1 className="large text-primary">Sign In</h1>
//         <p className="lead">
//           <i className="fas fa-user"></i> Sign Into Your Account
//         </p>
//         <form className="form" onSubmit={(e) => onSubmit(e)}>
//           {/* <form className="form" onSubmit={MyComponent}> */}
//           <div className="form-group">
//             <input
//               type="email"
//               placeholder="Email Address"
//               name="email"
//               value={email}
//               onChange={(e) => onChange(e)}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <input
//               type="password"
//               placeholder="Password"
//               name="password"
//               value={password}
//               onChange={(e) => onChange(e)}
//               minLength="3"
//             />
//           </div>
//           <input type="submit" className="btn btn-primary" value="Login" />
//         </form>
//         <p className="my-1">
//           Do not have an account? <Link to="/register">Sign Up</Link>
//         </p>
//       </Fragment>
//     </section>
//   );
// };

// Loginpage.propTypes = {
//   login: PropTypes.func.isRequired,
//   isAuthenticated: PropTypes.bool.isRequired,
//   user: PropTypes.object.isRequired,
// };

// const mapStateToProps = (state) => ({
//   isAuthenticated: state.auth.isAuthenticated,
//   user: state.auth.user,
// });

// export default connect(mapStateToProps, { login })(Loginpage);
