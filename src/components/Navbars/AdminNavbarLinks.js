import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
// @material-ui/core components
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Divider from "@material-ui/core/Divider";
import Grow from "@material-ui/core/Grow";
import Hidden from "@material-ui/core/Hidden";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Paper from "@material-ui/core/Paper";
import Poppers from "@material-ui/core/Popper";
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import Person from "@material-ui/icons/Person";

import styles from "assets/jss/material-dashboard-react/components/headerLinksStyle.js";
import Button from "components/CustomButtons/Button.js";
import { Link } from "react-router-dom";
import { authActions } from "../../store/auth";

const useStyles = makeStyles(styles);

export default function AdminNavbarLinks() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const getName = localStorage.getItem("name");
  const [openProfile, setOpenProfile] = React.useState(null);
  const [name, setName] = useState("");

  useEffect(() => {
    setName(getName);
  }, [getName]);

  const handleClickProfile = (event) => {
    if (openProfile && openProfile.contains(event.target)) {
      setOpenProfile(null);
    } else {
      setOpenProfile(event.currentTarget);
    }
  };
  const handleCloseProfile = () => {
    setOpenProfile(null);
  };

  const logoutHandler = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    dispatch(authActions.logout());
  };

  return (
    <div className="mt-2">
      <span className={window.innerWidth > 959 ? "" : "text-white ms-4"}>
        Xin chào, {name}
      </span>
      <div className={classes.manager}>
        <Button
          color={window.innerWidth > 959 ? "transparent" : "white"}
          justIcon={window.innerWidth > 959}
          simple={!(window.innerWidth > 959)}
          aria-owns={openProfile ? "profile-menu-list-grow" : null}
          aria-haspopup="true"
          onClick={handleClickProfile}
          className={classes.buttonLink}
        >
          <Person className={classes.icons} />
          <Hidden mdUp implementation="css">
            <p className={classes.linkText}>Profile</p>
          </Hidden>
        </Button>
        <Poppers
          open={Boolean(openProfile)}
          anchorEl={openProfile}
          transition
          disablePortal
          className={
            classNames({ [classes.popperClose]: !openProfile }) +
            " " +
            classes.popperNav
          }
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              id="profile-menu-list-grow"
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom",
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleCloseProfile}>
                  <MenuList role="menu">
                    <Link to="/admin/user" style={{ color: "#333" }}>
                      <MenuItem
                        onClick={handleCloseProfile}
                        className={classes.dropdownItem}
                      >
                        Thông tin cá nhân
                      </MenuItem>
                    </Link>
                    <Divider light />
                    <MenuItem
                      onClick={logoutHandler}
                      className={classes.dropdownItem}
                    >
                      Đăng xuất
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Poppers>
      </div>
    </div>
  );
}
