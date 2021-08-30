import React, { useEffect } from "react";
import "./App.css"
import "antd/dist/antd.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Dashboard from "./components/dashboard/Dashboard";
import ProjectDetails from "./components/projects/ProjectDetails";
import SignIn from "./components/auth/Signin";
import SignUp from "./components/auth/SignUp";
import Footer from "./components/layout/Footer";
import CreateProject from "./components/projects/CreateProject";
import { setActiveUser } from "./redux/slices/authSlice";
import {userDetails} from "./redux/slices/userSlice"
import { useDispatch } from "react-redux";
import firebase from "./firebase/config";
import ViewProfile from "./components/userpages/ViewProfile";
import MyProjects from "./components/userpages/MyProjects";
import EditProfile from "./components/userpages/EditProfile";

function App() {
  const dispatch = useDispatch();

  // const auth = useSelector((state) => state.auth);?

  useEffect(() => {
    firebase.auth().onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          setActiveUser({
            userName: authUser.displayName,
            userEmail: authUser.email,
            userId: authUser.uid,
          })
        );
        firebase.firestore().collection('users').doc(authUser.uid).get().then(snapshot => {
          if(snapshot.data()!==undefined) {
            dispatch(userDetails({
              name: snapshot.data().name,
              imageUrl: snapshot.data().imageUrl,
              email: snapshot.data().email,
              phone: snapshot.data().phone,
              experience: snapshot.data().experience
            }))
          }
          else{
            dispatch(userDetails({
              name: "",
              imageUrl: "",
              email: "",
              phone: "",
              experience: ""
            }))
          }
          
        })
      }
    });
  }, []);

  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route path="/project/:id" component={ProjectDetails} />
          <Route path="/create" component={CreateProject} />
          <Route path="/user/profile/:id" component={ViewProfile} />
          <Route path="/user/edit/profile/:id" component={EditProfile} />
          <Route path="/user/:id/projects" component={MyProjects} />
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
        </Switch>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
