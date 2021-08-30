import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom"
import firebase from "../../firebase/config";
import { setUserLogOut } from "../../redux/slices/authSlice";
import { colors } from "../../Colors";
import swal from "sweetalert";
import { Menu, Dropdown, Avatar } from 'antd';
import { Button } from "antd/lib/radio";

const SignedInLinks = ({ toggle }) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.userAuth);
  const user = useSelector((state) => state.user);

  var item = colors[Math.floor(Math.random() * colors.length)];
  const onLogOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch(setUserLogOut());
      })
      .catch((err) => {
        swal(err.message);
      });
  };
  const menu = (
    <Menu>
      <Menu.Item key="1">
        <Link to={`/user/profile/${auth.userId}`} >
          View Profile
        </Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to={`/user/edit/profile/${auth.userId}`} >
          Update Profile
        </Link>
      </Menu.Item>
      <Menu.Item key="3">
        <Link to={`/user/${auth.userId}/projects`}>
          My Projects
        </Link>
      </Menu.Item>
      <Menu.Item key="4">
        <Link to="/" onClick={onLogOut} >
          Log Out
        </Link>
      </Menu.Item>
    </Menu>
  );

  if (toggle) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: "center", justifyContent: 'center', marginTop: '40px' }}>
        <Link style={{ marginBottom: "30px" }} to={`/user/profile/${auth.userId}`}>

          {
            user.imageUrl ? (<Avatar
              style={{ backgroundColor: `${item}`, marginLeft: "10px" }}
              size={100}
              icon={<img src={user.imageUrl} alt={user.name} />}
            >

              {auth.userName.slice(0, 1)}
            </Avatar>) : (<Avatar
              style={{ backgroundColor: `${item}`, marginLeft: "10px" }}
              size={100}
            >

              {auth.userName.slice(0, 1)}
            </Avatar>)

          }

        </Link>
        <div>
          <Menu style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Menu.Item key="1">
              <NavLink to="/" className="navbar__link">
                Home
              </NavLink>
            </Menu.Item>
            <Menu.Item key="2">
              <NavLink to="/create" className="navbar__link">
                Add Project
              </NavLink>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to={`/user/${auth.userId}/projects`}>
                My Projects
              </Link>
            </Menu.Item>
            <Menu.Item key="4">
              <Link to={`/user/profile/${auth.userId}`} >
                View Profile
              </Link>
            </Menu.Item>
            <Menu.Item key="5">
              <Link to={`/user/edit/profile/${auth.userId}`} >
                Update Profile
              </Link>
            </Menu.Item>

            <Menu.Item key="6">
              <Button onClick={onLogOut}>
                Log Out
              </Button>
            </Menu.Item>
          </Menu>
        </div>

      </div>

    );
  } else {
    return (
      <ul>
        <li >
          <NavLink to="/" className="navbar__link">
            Home
          </NavLink>
        </li>
        <li >
          <NavLink to="/create" className="navbar__link">
            Add Project
          </NavLink>
        </li>
        <li>
          <Dropdown overlay={menu} placement="bottomCenter" arrow>
          {
            user.imageUrl ? (<Avatar
              style={{ backgroundColor: `${item}`, marginLeft: "10px" }}
              size="large"
              icon={<img src={user.imageUrl} alt={user.name} />}
            >

              {auth.userName.slice(0, 1)}
            </Avatar>) : (<Avatar
              style={{ backgroundColor: `${item}`, marginLeft: "10px" }}
              size="large"
            >

              {auth.userName.slice(0, 1)}
            </Avatar>)

          }
          </Dropdown>
        </li>
      </ul>
    );
  }

};

export default SignedInLinks;
