import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProject } from "../../redux/slices/projectSlice";
import { useHistory, Redirect } from "react-router-dom";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import swal from "sweetalert";

const CreateProject = () => {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState()
  const history = useHistory();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.userAuth);

  const changeTitle = (e) => {
    setTitle(e.target.value)
  };

  const handleContent = (e, editor) => {
    const data = editor.getData();
    setContent(data)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && content) {
      const userName = auth.userName;
      const userId = auth.userId;
      dispatch(createProject({ title, content, userName, userId }));
      history.push("/");
    } else {
      swal("Please Add Project Details ");
    }

  };

  return (
    <div
      className="container"
      style={{ marginTop: "90px", marginBottom: "40px" }}
    >
      {auth.userId ? (
        <form onSubmit={handleSubmit} className="white" style={{ borderRadius: "10px" }}>
          <h5 className="grey-text text-darken-3">Create New Project</h5>
          <div className="input-field">
            <label htmlFor="title"> Project Title</label>
            <input type="text" id="title" onChange={changeTitle} />
          </div>
          <div className="input-field">
            <CKEditor
              editor={ClassicEditor}
              data={content}
              onChange={handleContent}
            />
          </div>
          <div className="input-field">
            <button type="submit" className="btn pink lighten-1 z-depth-0">
              Create
            </button>
          </div>
        </form>
      ) : (
        <Redirect to="/signin" />
      )}
    </div>
  );
};

export default CreateProject;
