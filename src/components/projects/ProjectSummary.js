import React from "react";
import moment from "moment";
import { Card } from 'antd';
import { useSelector } from "react-redux"
const ProjectSummary = ({ project }) => {
  const auth = useSelector(state => state.userAuth)
  return (
    <>
      <Card hoverable style={{ marginBottom: "10px" }}>
        <div className="card z-depth-0 project-summary " >
          <div className="card-content grey-text text-darken-3">
            <span className="card-title" style={{ fontWeight: 'bold', fontSize: '16px' }}>{project.title}</span>
            {
              project.authorId === auth.userId ?
                <p>posted by you</p> :
                <p>posted by {project.authorName}</p>

            }
            <p className="grey-text">{moment(project.createdAt.toDate()).fromNow()}</p>
          </div>
        </div>
      </Card>
    </>
  );
};

export default ProjectSummary;
