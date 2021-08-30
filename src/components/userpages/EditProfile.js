import React, { useState } from 'react'
import firebase from '../../firebase/config';
import { useSelector,useDispatch } from "react-redux"
import { Progress } from 'antd';
import { Redirect } from "react-router-dom"
import {userDetails} from "../../redux/slices/userSlice"
import swal from "sweetalert"
const EditProfile = () => {
    const [userData, setUserData] = useState();
    const [profileImage, setProfileImage] = useState();
    const [progress, setProgress] = useState(0);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const auth = useSelector(state => state.userAuth)
    const changeHandler = (e) => {
        setUserData({ ...userData, [e.target.id]: e.target.value })
    }

    const fetchDetails = (e) => {
        
              firebase.firestore().collection('users').doc(auth.userId).get().then(snapshot => {
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

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(userData);
        if (userData) {
            if (userData.name != null, userData.email != null, userData.phone != null, userData.experience != null, profileImage) {
                setLoading(true);
                const uploadTask = firebase.storage().ref(`images/${profileImage.name}`).put(profileImage);
                uploadTask.on(
                    "state_changed",
                    (snapshot) => {
                        // progress functionality

                        let percentage = Math.round(
                            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                        );

                        setProgress(percentage);
                    },
                    (error) => {
                        swal(error.message);
                    },
                    () => {
                        firebase.storage()
                            .ref("images")
                            .child(profileImage.name)
                            .getDownloadURL()
                            .then((url) => {
                                firebase.firestore().collection("users").doc(auth.userId).set({
                                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                                    name: userData.name,
                                    imageUrl: url,
                                    email: userData.email,
                                    phone: userData.phone,
                                    experience: userData.experience
                                });
                                fetchDetails();
                            });
                    }
                );
            } else {
                swal("Please Fill The Form")
            }
        } else {
            swal("Please Fill The Form")
        }

    }

    const handleImageChange = (e) => {
        setProfileImage(e.target.files[0])
    }
    if (auth.userId) {
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
                    height: "100vh"
                }}
            >

                {progress === 100 ?

                    <Redirect to="/" />

                    : (<form
                        onSubmit={handleSubmit}
                        className="white"
                        style={{
                            borderRadius: "20px",
                            width: "100%"
                        }}

                    >
                        <h5 className="grey-text text-darken-4 center-align">Profile</h5>
                        {
                            loading ? (
                                <Progress type="circle" percent={progress} />
                            ) : (
                                <div>
                                    <div className="input-field">
                                        <label htmlFor="name">Full Name</label>
                                        <input
                                            type="text"
                                            id="name"
                                            style={{ paddingLeft: "5px" }}
                                            onChange={changeHandler}
                                        />
                                    </div>
                                    <div className="input-field">
                                        <label htmlFor="email">Email</label>
                                        <input
                                            type="email"
                                            id="email"
                                            style={{ paddingLeft: "5px" }}
                                            onChange={changeHandler}
                                        />
                                    </div>
                                    <div className="input-field">
                                        <label htmlFor="phone">Phone</label>
                                        <input
                                            type="text"
                                            id="phone"
                                            onChange={changeHandler}
                                            style={{ paddingLeft: "5px" }}
                                        />
                                    </div>
                                    <div className="input-field">
                                        <label htmlFor="experience">Experience</label>
                                        <input
                                            type="number"
                                            id="experience"
                                            onChange={changeHandler}
                                            style={{ paddingLeft: "5px" }}
                                        />
                                    </div>
                                    <div className="input-field profile__image">
                                        <input type="file" id="image" onChange={handleImageChange} />
                                    </div>

                                    <div className="input-field">
                                        <button type="submit" className="btn pink lighten-1 z-depth-0">
                                            update
                                        </button>
                                    </div>

                                </div>
                            )
                        }

                    </form>)}

            </div>
        )
    } else {
        return (
            <Redirect to="/signin" />

        )

    }

}

export default EditProfile
