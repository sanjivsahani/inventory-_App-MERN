import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import BusniessInfo from "./component/home/BusniessInfo"
import BussinessTable from './component/home/BussinessTable';
import Buyer from "./component/home/Buyer"
import BuyerTable from './component/home/BuyerTable';
import LoginCompo from "./component/home/LoginCompo"
import MainContainer from "./component/home/MainContainer"
import Order from "./component/home/Order"
import ProductInfo from "./component/home/Product"
import ProductTable from './component/home/ProductTable';
import PurchaseInfo from "./component/home/PurchaseInfo"
import Sell from "./component/home/Sell"
import SignCompo from "./component/home/SignCompo"
import SuplierInfo from "./component/home/SuplierInfo"
import SupplierTable from './component/home/SupplierTable';
import SideBar from './component/navigation/SideBar';

import React, { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
// import  {makeStyles}from '@mui/styles'
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItemText from '@mui/material/ListItemText';
import { ListItem } from '@mui/material'
import AccountCircle from '@mui/icons-material/AccountCircle';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SellIcon from '@mui/icons-material/Sell';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import DescriptionIcon from '@mui/icons-material/Description';
import LogoutIcon from '@mui/icons-material/Logout';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreIcon from '@mui/icons-material/MoreVert';
import axios from 'axios';
import Dashboard from './component/dashbord/Dashboard';
import SideNav_list from './component/navigation/SideNav_list';
// import { useNavigate } from 'react-router-dom';


const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});


const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);




// background color for the drower



const App = () => {

  // classes for the styling the component (drower)
  // mui side person icons methids are here
  const [user, setUser] = useState([])
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };
  // const navigate = useNavigate()

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const navigate_Bussniess = () => {
    // navigate('/businessinfo')
  }

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={navigate_Bussniess} >My Busniess info</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >

      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );


  //  Style for sidBar
  const icons = { color: "#24ffc8", margin: "6px" }



  const theme = useTheme();
  const [open, setOpen] = useState(false);
  // Navigate page

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  //  
  const logout_btn = () => {
    localStorage.removeItem("token")
    
  }

  //axios call for get the user name 
  const getdata = async () => {
    // create a config to send the auth token 
    const config = {
      headers: {
        //   we are finding the token from localstorage 
        "Authorization": localStorage.getItem("token")
      },
    };

    // make sure the axios request should be  schyronous 
    await axios.get("http://localhost:8080/auth/getuser", config).then((res) => {
      setUser(res.data.name)
    })

  };
  getdata()

  return (
    <Box sx={{ display: 'flex' }} >
      <CssBaseline />
      <AppBar position="fixed" open={open} style={{ backgroundColor: "black" }} >
        <Toolbar >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Inventory app
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Typography variant='h6' style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>{user}</Typography>

            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />

            </IconButton>
          </Box>
        </Toolbar>

      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      <Drawer variant="permanent" open={open}    >
        <DrawerHeader  >
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>

<SideNav_list/>
        <Divider />

      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {/* routes are avilable */}
        <>

          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<LoginCompo />} />
              <Route path="/signup" element={<SignCompo />} />
              <Route path="/product" element={<ProductInfo />} />
              <Route path="/businesstable" element={<BussinessTable />} />
              <Route path="/businessinfo" element={<BusniessInfo />} />
              <Route path="/product/productinfo" element={<ProductTable />} />
              <Route path="/purchase" element={<PurchaseInfo />} />
              <Route path="/suplier" element={<SuplierInfo />} />
              <Route path="/supliertable" element={<SupplierTable />} />
              <Route path="/buyer" element={<Buyer />} />
              <Route path="/buyertable" element={<BuyerTable />} />
              <Route path="/dashboard" element={<Dashboard/>} />


              {/* <SideBar/> */}

            </Routes>
          </BrowserRouter>


        </>
      </Box>
    </Box>
  );
}
export default App;



