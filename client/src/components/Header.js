import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";
import { useStyles } from "../style/styleHeader";

import { AppBar, IconButton, Toolbar, Typography } from "@material-ui/core";

import MenuIcon from "@material-ui/icons/Menu";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

const Header = ({ showMenuBar }) => {
  const classes = useStyles();
  const cart = useSelector((state) => state.products.cart);
  
  const [countItem, setCountItem] = useState(0);

  useEffect(() => {
    let count = 0;
    cart.forEach((item) => {
      count += item.qty;
    });
    setCountItem(count);
  }, [cart]);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar style={{ backgroundColor: "#48B0C7", color: "#000000" }}>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={showMenuBar}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            <Link style={{ color: "#000000", textDecoration: "none" }} to="/">
              HOME
            </Link>
          </Typography>

          <Link
            style={{
              backgroundColor: "#17517E",
              border: "none",
              margin: "10px 0 10px 0",
              borderRadius: "10px",
              width: "100px",
              textDecoration: "none",
            }}
            to={"/cart"}
          >
            <Typography
              variant="h6"
              style={{
                marginTop: "10px",
                marginBottom: "10px",
                padding: "5px 15px 5px 15px",
                borderRadius: "15px",
                color: "#ffffff",
                display: "flex",
                alignItems: "center",
                fontFamily: `Balsamiq Sans`,
              }}
            >
              <ShoppingCartIcon
                fontSize="large"
                style={{ marginRight: "10px", color: "#ffffff" }}
              />
              {countItem}
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
