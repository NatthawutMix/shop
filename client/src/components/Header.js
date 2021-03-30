import React from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { userLogout } from "../redux/user";
import { useStyles } from "../style/styleHeader";

import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

const Header = ({ user, userLogout, showMenuBar }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar style={{ backgroundColor: "#a4ebf3", color: "#000000" }}>
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
          {user ? (
            <Button color="inherit" onClick={() => userLogout()}>
              LogOut
            </Button>
          ) : (
            <Link
              to="/login"
              style={{ textDecoration: "none", color: "#ffffff" }}
            >
              <Button color="inherit" as={Link} to="/login">
                LogIn
              </Button>
            </Link>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default connect((state) => ({ user: state.user.user }), { userLogout })(
  Header
);
