import React from "react";
import moment from "moment";
import { Card, Button, Tooltip } from 'antd';
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons"
import firebase from "../../firebase/config";
import swal from "sweetalert";
import { useHistory } from "react-router-dom"
const ProjectSummaryForMyprojects = ({ project, id, path }) => {
    const history = useHistory();
    const DeleteHandler = () => {
        firebase.firestore().collection('projects').doc(id).delete()
            .then(() => {
                swal("Project successfully deleted!");
            }).catch((error) => {
                swal(error.message);
            });
    }

    return (
        <>
            <Card hoverable style={{ marginBottom: "10px", backgroundColor: 'white' }}>
                <div className="card z-depth-0 project-summary " >
                    <div className="card-content grey-text text-darken-3">
                        <span className="card-title" style={{ fontWeight: 'bold', fontSize: '16px' }}>{project.title}</span>
                        <p>posted by you</p>
                        <p className="grey-text">{moment(project.createdAt.toDate()).fromNow()}</p>

                    </div>
                    <div className="card-action " style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
                        <Tooltip title="Open Project" placement="bottom">
                            <Button onClick={() => history.push(path)}><EyeOutlined /></Button>

                        </Tooltip>
                        <Tooltip title="Delete Project" placement="bottom">
                            <Button onClick={DeleteHandler}><DeleteOutlined /></Button>

                        </Tooltip>
                    </div>
                </div>
            </Card>
        </>
    );
};

export default ProjectSummaryForMyprojects;
