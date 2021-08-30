import React, { useState, useEffect } from "react";
import firebase from "../../firebase/config";
import ProjectList from "../projects/ProjectList";
import { useSelector } from "react-redux"

import { Redirect } from "react-router-dom"

const MyProjects = (props) => {
    const id = props.match.params.id;
    const [projects, setProjects] = useState([]);
    const [mounted, setMounted] = useState(true);
    const auth = useSelector(state => state.userAuth)

    const fetchProjects = () => {
        firebase
            .firestore()
            .collection("projects")
            .orderBy("createdAt", "desc")
            .onSnapshot((snapshot) => {
                if (mounted) {
                    setProjects(
                        snapshot.docs.map((doc) => {
                            return doc.data().authorId === id && {
                                id: doc.id,
                                projectData: doc.data()
                            }
                        })
                    );
                }

            })

    };

    useEffect(() => {
        fetchProjects();
        return () => {
            setMounted(false);
        };
    }, []);
    if (auth.userId) {
        return (
            <div className="myprojects  ">
                {projects.length > 0 ? (
                    <div>
                        <div>
                            <ProjectList projects={projects} from="myprojects"/>
                        </div>
                    </div>
                ) : (
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            height: "100vh",
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
                )}
            </div>
        )
    } else {
        return (
            <Redirect to="/signin" />

        )
    }

};

export default MyProjects;
