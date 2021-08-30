import React, { useState } from "react";
import { Link } from "react-router-dom";
import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";
import { useSelector } from "react-redux";

import {Drawer,Button} from "antd";
import {MenuOutlined} from "@ant-design/icons"

const MobNavbar = ({onClose,visible}) => {
  const auth = useSelector((state) => state.userAuth);

  return (
    <Drawer
        placement="left"
        closable={false}
        onClose={onClose}
        visible={visible}
      >
      <div className="container nav_bar">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {auth.userName ? (
            <SignedInLinks toggle={visible}/>
          ) : (
            <SignedOutLinks toggle={visible}/>
          )}
        </div>
      </div>
    </Drawer>
  );
};

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const auth = useSelector((state) => state.userAuth);
  return (
    <>
      <nav
        className="nav-wrapper white z-depth-0 navbar "
        style={{ position: "fixed", zIndex: 1, top: "0px" }}
      >
        <div className="container nav_bar">
          <Link
            to="/"
            className="brand-logo navbar__logo grey-text text-darken-3 left "
            style={{ paddingLeft: "10px" }}
          >
            PMS
          </Link>
          <Button
            className=" gray pulse right btn-floating white hide-on-large-only "
            onClick={() => setToggle(!toggle)}
            style={{
              marginTop: "7px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <MenuOutlined style={{color:"black",fontSize:"large",}}/>
          </Button>
          <div className="hide-on-med-and-down right">
            {auth.userName ? <SignedInLinks /> : <SignedOutLinks />}
          </div>
        </div>
      </nav>
      {toggle && <MobNavbar onClose={() => setToggle(!toggle)} visible={toggle}/>}
    </>
  );
};

export default Navbar;
