import React from "react";
import { NavLink } from "react-router-dom";
import { Menu, Button,h2 } from "antd"
const SignedOutLinks = ({ toggle }) => {
  if (toggle) {
    return (
      <div style={{ display:'flex', flexDirection: 'column', alignItems:"center",justifyContent: 'center',marginTop:"90px"}}>
        <div style={{ display:'flex', flexDirection: 'column', alignItems:"center",justifyContent: 'center'}}>
        
          <NavLink to="/" >
              <h4  style={{fontfamily: 'Quicksand'}}>PMS</h4>
            </NavLink>
          
        </div>
        <Menu style={{ display:'flex', flexDirection: 'column', alignItems:"center",justifyContent: 'center'}}>
        <Menu.Item key="1">
          <Button>
          <NavLink to="/signup" className="navbar__link" >
              Signup
            </NavLink>
          </Button>
        </Menu.Item>
        <Menu.Item key="2"> 
          <Button>
          <NavLink to="/signin" className="navbar__link" >
              Login
            </NavLink>
          </Button>
        </Menu.Item>
      </Menu>
      </div>
      
    )

  } else {
    return (
      <>
        <ul>
          <li>
            <NavLink to="/signup" className="navbar__link" >
              Signup
            </NavLink>
          </li>
          <li>
            <NavLink to="/signin" className="navbar__link" >
              Login
            </NavLink>
          </li>
        </ul>
      </>
    );
  }

};

export default SignedOutLinks;
