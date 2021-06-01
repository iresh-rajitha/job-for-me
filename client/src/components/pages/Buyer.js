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

import LandngNav from "../layout/LandingNav";
import Footer from "../layout/Footer";
import { useHistory } from "react-router-dom";
import Container from "@material-ui/core/Container";

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
  userType: "Buyer",
  category: "",
  email: "",
  password: "",
};

const SellersForm = ({ classes, ...props }) => {
  const { addToast } = useToasts();
  let history = useHistory();

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

  const setRole = (fieldValues = values) => {
    fieldValues.userType = "Buyer";
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
  // const inputLabel = React.useRef(null);
  // const [labelWidth, setLabelWidth] = React.useState(0);
  // React.useEffect(() => {
  //   setLabelWidth(inputLabel.current.offsetWidth);
  // }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setRole();
    if (validate()) {
      history.push({
        pathname: "/order",
        state: values.email,
      });
      const onSuccess = () => {
        resetForm();
        addToast("Submitted successfully", { appearance: "success" });
      };
      // if (props.currentId === 0) {
      //   props.createSeller(values, onSuccess);
      // } else {
      //   props.updateSeller(props.currentId, values, onSuccess);
      // }
      props.createSeller(values, onSuccess);
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
      <LandngNav />
      <section className="container">
        <Container component="main" maxWidth="xs">
          <div>
            <h1 className="large text-primary">Join with us!</h1>
            <p className="lead">
              <i className="fas fa-user"></i> Create Your Customer Profile
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
              {/* <Grid item xs={12}>
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
            </Grid> */}
              <Grid item xs={12}>
                <TextField
                  name="email"
                  variant="outlined"
                  label="Email"
                  value={values.email}
                  onChange={handleInputChange}
                  {...(errors.email && {
                    error: true,
                    helperText: errors.email,
                  })}
                />
              </Grid>
              {/* <Grid item xs={12}>
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
            </Grid> */}
              <Grid item xs={12}>
                <TextField
                  type="password"
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
        </Container>
      </section>
      <Footer />
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  sellerList: state.sellers.list,
});

const mapActionToProps = {
  createSeller: actions.create,
  updateSeller: actions.update,
  fetchAllSellers: actions.fetchAll,
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(SellersForm));

// import React, { Fragment } from "react";
// import PropTypes from 'prop-types';
// import AppBar from '@material-ui/core/AppBar';
// import CssBaseline from '@material-ui/core/CssBaseline';
// import Divider from '@material-ui/core/Divider';
// import Drawer from '@material-ui/core/Drawer';
// import Hidden from '@material-ui/core/Hidden';
// import IconButton from '@material-ui/core/IconButton';
// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
// import ListItemText from '@material-ui/core/ListItemText';
// import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
// import { makeStyles, useTheme } from '@material-ui/core/styles';
// import {Dashboard, Menu,ShoppingCart, SupervisorAccount,Chat, Equalizer, Report } from '@material-ui/icons';
// import { Link, Route, Switch,useRouteMatch } from "react-router-dom";
// // import { Orderpage } from "./Buyer/Order-page";
// const drawerWidth = 240;

// const useStyles = makeStyles((theme) => ({

//   root: {
//     display: 'flex',
//   },
//   drawer: {
//     [theme.breakpoints.up('sm')]: {
//       width: drawerWidth,
//       flexShrink: 0,
//     },
//   },
//   appBar: {
//     [theme.breakpoints.up('sm')]: {
//       width: `calc(100% - ${drawerWidth}px)`,
//       marginLeft: drawerWidth,
//     },
//   },
//   menuButton: {
//     marginRight: theme.spacing(2),
//     [theme.breakpoints.up('sm')]: {
//       display: 'none',
//     },
//   },
//   // necessary for content to be below app bar
//   toolbar: theme.mixins.toolbar,
//   drawerPaper: {
//     width: drawerWidth,
//   },
//   content: {
//     flexGrow: 1,
//     padding: theme.spacing(3),
//   },
// }));

// function ResponsiveDrawer(props) {
//   let { path, url } = useRouteMatch();
//   const { window } = props;
//   const classes = useStyles();
//   const theme = useTheme();
//   const [mobileOpen, setMobileOpen] = React.useState(false);

//   const handleDrawerToggle = () => {
//     setMobileOpen(!mobileOpen);
//   };

//   const itemList =[
//     {
//       name:'Dashboard',
//       icon: <Dashboard/>,
//       to: '/'
//     },
//     {
//       name:'Order',
//       icon: <ShoppingCart/>,
//       to: `${url}/order`
//     },
//     {
//       name:'Message',
//       icon: <Chat/>,
//       to: `${url}/message`
//     },
//     {
//       name:'Admin',
//       icon: <SupervisorAccount/>,
//       to: `${url}/admin`
//     },
//     {
//       name:'Stats',
//       icon: <Equalizer/>,
//       to: `${url}/stats`
//     },
//     {
//       name:'Report',
//       icon: <Report/>,
//       to: `${url}/report`
//     }
//   ];

//   const drawer = (
//     <div>
//       <div className={classes.toolbar} />
//       <Divider />
//       <List>
//         {itemList.map((item, index) => (
//           <Link to={item.to}>
//           <ListItem button key={item.name}>
//             <ListItemIcon>{item.icon}</ListItemIcon>
//             <ListItemText primary={item.name} />
//           </ListItem>
//           </Link>

//         ))}
//       </List>
//     </div>
//   );

//   const container = window !== undefined ? () => window().document.body : undefined;

//   return (
//     <div className={classes.root}>
//       <CssBaseline />
//       <AppBar position="fixed" className={classes.appBar}>
//         <Toolbar>
//           <IconButton
//             color="inherit"
//             aria-label="open drawer"
//             edge="start"
//             onClick={handleDrawerToggle}
//             className={classes.menuButton}
//           >
//             <Menu />
//           </IconButton>
//           <Typography variant="h6" noWrap>
//             You logged as Buyer
//           </Typography>
//         </Toolbar>
//       </AppBar>
//       <nav className={classes.drawer} aria-label="mailbox folders">
//         {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
//         <Hidden smUp implementation="css">
//           <Drawer
//             container={container}
//             variant="temporary"
//             anchor={theme.direction === 'rtl' ? 'right' : 'left'}
//             open={mobileOpen}
//             onClose={handleDrawerToggle}
//             classes={{
//               paper: classes.drawerPaper,
//             }}
//             ModalProps={{
//               keepMounted: true, // Better open performance on mobile.
//             }}
//           >
//             {drawer}
//           </Drawer>
//         </Hidden>
//         <Hidden xsDown implementation="css">
//           <Drawer
//             classes={{
//               paper: classes.drawerPaper,
//             }}
//             variant="permanent"
//             open
//           >
//             {drawer}
//           </Drawer>
//         </Hidden>
//       </nav>

//       <main className={classes.content}>
//         <div className={classes.toolbar} />
//         <Switch>
//         <Route exact path={`${path}/`}>
//             Dashboard
//         </Route>
//         <Route exact path={`${path}/order`}>
//             {/* <Orderpage/> */}
//             Order
//         </Route>
//         <Route exact path={`${path}/message`}>
//             Message
//         </Route>
//         <Route exact path={`${path}/admin`}>
//             Admin
//         </Route>
//         <Route exact path={`${path}/stats`}>
//             Statics
//         </Route>
//         <Route exact path={`${path}/report`}>
//             Report
//         </Route>
//       </Switch>
//       </main>
//     </div>
//   );
// }

// ResponsiveDrawer.propTypes = {
//   /**
//    * Injected by the documentation to work in an iframe.
//    * You won't need it on your project.
//    */
//   window: PropTypes.func,
// };

// export default ResponsiveDrawer;
