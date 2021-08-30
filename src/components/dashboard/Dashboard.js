import React, { useState, useEffect } from "react";
import ProjectList from "../projects/ProjectList";
import firebase from "../../firebase/config";

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [mounted, setMounted] = useState(true);
  const [loading, setLoading] = useState(false)
  const fetchProjects = () => {
    firebase
      .firestore()
      .collection("projects")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        if (mounted) {
          setProjects(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              projectData: doc.data(),
            }))
          );
        }
      });
  };
  useEffect(() => {
    fetchProjects();
    return () => {
      setMounted(false);
    };
  }, []);

  return (
    <div className="dashboard ">
      {projects.length>0 ? (
        <div>
          <div>
            <ProjectList projects={projects} from="dashboard"/>
          </div>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height:'100vh',
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
  );
};

export default Dashboard;
