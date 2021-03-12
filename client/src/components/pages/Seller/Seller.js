import React, { Fragment } from "react";
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {Dashboard, Menu,ShoppingCart, SupervisorAccount,Chat, Equalizer, Report } from '@material-ui/icons';
import { Link, Route, Switch,useRouteMatch } from "react-router-dom";
import Orderpage from "../Buyer/Order/Orderpage";
const drawerWidth = 240;

 
const useStyles = makeStyles((theme) => ({
  
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function Admin(props) {
  let { path, url } = useRouteMatch();
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const itemList =[
    {
      name:'Dashboard',
      icon: <Dashboard/>,
      to: '/'
    },
    {
      name:'Order',
      icon: <ShoppingCart/>,
      to: `${url}/order`
    },
    {
      name:'Message',
      icon: <Chat/>,
      to: `${url}/message`
    },
    {
      name:'Admin',
      icon: <SupervisorAccount/>,
      to: `${url}/admin`
    },
    {
      name:'Stats',
      icon: <Equalizer/>,
      to: `${url}/stats`
    },
    {
      name:'Report',
      icon: <Report/>,
      to: `${url}/report`
    }
  ];

  

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {itemList.map((item, index) => (
          <Link to={item.to}>
          <ListItem button key={item.name}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.name} />
          </ListItem>
          </Link>
          
        ))}
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6" noWrap>
            You logged as Seller
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Switch>
        <Route exact path={`${path}/`}>
            Dashboard
        </Route>
        <Route exact path={`${path}/order`}>
            <Orderpage/>
        </Route>
        <Route exact path={`${path}/message`}>
            Message
        </Route>
        <Route exact path={`${path}/admin`}>
            Admin
        </Route>
        <Route exact path={`${path}/stats`}>
            Statics
        </Route>
        <Route exact path={`${path}/report`}>
            Report
        </Route>
      </Switch>
      </main>
    </div>
  );
}

Admin.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Admin;
