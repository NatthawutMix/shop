import React, { useState } from "react";

import "../css/MenuBar.css";
import { useHistory } from "react-router";
import { connect } from "react-redux";
import { userLogout } from "../redux/user";

import { Link } from "react-router-dom";

import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";

import VpnKeyIcon from "@material-ui/icons/VpnKey";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import HomeIcon from "@material-ui/icons/Home";

const MenuBar = ({ user, show, click, userLogout }) => {
  const history = useHistory();
  const sideDrawerClass = ["menubar"];

  const handleListItemClick = (event, index) => {
    if (index === 0) {
      history.push("/");
      click();
    } else if (index === 1) {
      history.push("/create");
      click();
    } else if (index === 2) {
      history.push("/edit");
      click();
    } else if (index === 3) {
      userLogout();
    } else {
      history.push("/");
      click();
    }
  };

  if (show) {
    sideDrawerClass.push("show");
  }

  return (
    <div className={sideDrawerClass.join(" ")}>
      <List component="nav" aria-label="main mailbox folders">
        <ListItem button onClick={(event) => handleListItemClick(event, 0)}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button onClick={(event) => handleListItemClick(event, 1)}>
          <ListItemIcon>
            <AddIcon />
          </ListItemIcon>
          <ListItemText primary="New" />
        </ListItem>
        <ListItem button onClick={(event) => handleListItemClick(event, 2)}>
          <ListItemIcon>
            <EditIcon />
          </ListItemIcon>
          <ListItemText primary="Edit" />
        </ListItem>
        {user ? (
          <ListItem button onClick={(event) => handleListItemClick(event, 3)}>
            <ListItemIcon>
              <VpnKeyIcon color="action" />
            </ListItemIcon>

            <ListItemText primary="LogOut" />
          </ListItem>
        ) : (
          <Link
            to="/login"
            style={{ textDecoration: "none", color: "#000000" }}
            onClick={click}
          >
            <ListItem color="inherit">
              <ListItemIcon>
                <VpnKeyIcon color="action" />
              </ListItemIcon>
              <ListItemText primary="LogIn" />
            </ListItem>
          </Link>
        )}
      </List>
    </div>
  );
};

export default connect((state) => ({ user: state.user.user }), { userLogout })(
  MenuBar
);
