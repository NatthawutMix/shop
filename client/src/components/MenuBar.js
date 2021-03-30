import React from "react";

import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";

import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import HomeIcon from "@material-ui/icons/Home";

import "../css/MenuBar.css";
import { useHistory } from "react-router";

const MenuBar = ({ show, click }) => {
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
      </List>
    </div>
  );
};

export default MenuBar;
