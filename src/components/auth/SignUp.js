import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import firebase from "../../firebase/config";
import swal from "sweetalert";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

const SignUp = () => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const auth = useSelector((state) => state.userAuth);
  const changeHandler = (e) => {
    setUser({ ...user, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user) {
      const { email, password, username } = user;
      if (email && password && username) {
        setLoading(true);
        firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then((authUser) => {
            authUser.user.updateProfile({
              displayName: username,
            });
            history.go("/");
          })
          .catch((error) => {
            swal(error.message);
            history.push("/")
          });
      } else {
        swal("Please Fill The Form");
      }
    } else {
      swal("Please Fill The Form");
    }
  };

  if (auth.userId) {
    return <Redirect to="/" />;
  } else {
    return (
      <div
        className="container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "40px",
          marginBottom: "40px",
          width: "400px",
          height:"100vh"
        }}
      >
        {loading ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <div className="preloader-wrapper active">
              <div className="spinner-layer spinner-red-only">
                <div className="circle-clipper left">
                  <div className="circle"></div>
                </div>
                <div className="gap-patch">
                  <div className="circle"></div>
                </div>
                <div className="circle-clipper right">
                  <div className="circle"></div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="white" style={{borderRadius:'20px',width:'100%'}}>
            <h5 className="grey-text text-darken-4 center-align">Sign Up</h5>
            <div className="input-field">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                onChange={changeHandler}
                style={{ paddingLeft: "5px" }}
              />
            </div>
            <div className="input-field">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                onChange={changeHandler}
                style={{ paddingLeft: "5px" }}
              />
            </div>
            <div className="input-field">
              <label htmlFor="firstname">User Name</label>
              <input
                type="text"
                id="username"
                onChange={changeHandler}
                style={{ paddingLeft: "5px" }}
              />
            </div>
            <div className="input-field">
              <button type="submit" className="btn pink lighten-1 z-depth-0">
                SignUp
              </button>
            </div>
          </form>
        )}
      </div>
    );
  }
};

export default SignUp;
