import React from "react";
import Masonry from "react-masonry-css";
import { Link } from "react-router-dom";
import ProjectSummary from "./ProjectSummary";
import ProjectSummaryForMyprojects from "./ProjectSummaryForMyprojects";
const Columns = {
  default: 3,
  1200: 3,
  1000: 2,
  700: 1
};

const ProjectList = ({ projects, from }) => {
  let count = 0;
  projects.forEach(project => {
    if (!project) {
      count = count + 1;
    }
  })
  if (count === projects.length) {
    return (
      <div className="pofile">
        No Project
      </div>
    )
  }
  return (
    <div className="project-list section">
      <Masonry
        breakpointCols={Columns}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {
          projects &&
          projects.map((doc) => {
            if (doc) {
              return (
                <div key={doc.id}>
                  {
                    from === "dashboard" && <Link to={`/project/${doc.id}`} key={doc.id}>
                      <ProjectSummary project={doc.projectData}   />
                    </Link>
                  }
                  {
                    from==="myprojects" &&  <ProjectSummaryForMyprojects project={doc.projectData} id={doc.id} path={`/project/${doc.id}`} key={doc.id}/>
                  }
                </div>
              );
            }

          })
        }
      </Masonry>
    </div>
  );

};

export default ProjectList;
