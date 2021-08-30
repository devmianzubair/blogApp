import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import firebase from "../../firebase/config";
const initialState = {
  loading: false,
  error: "",
  result: "",
  message: "",
  projects: [],
};

export const createProject = createAsyncThunk(
  "createproject",
  async ({title, content, userName, userId}) => {
    const result = await firebase.firestore().collection("projects").add({
      title: title,
      content: content,
      authorName: userName,
      authorId: userId,
      view: 0,
      createdAt: new Date(),
    });
    if (result) {
      return true;
    } else {
      return false;
    }
  }
);

export const addCommentToProject = createAsyncThunk(
  "addcommenttoproject",
  async ({ comment, id, userId, username }) => {
    try {
      const result = await firebase
        .firestore()
        .collection("analytics")
        .doc(id)
        .collection("comments")
        .add({
          userId: userId,
          username: username,
          comment: comment,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        });
      if (result) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return error.message;
    }
  }
);

const projectSlice = createSlice({
  name: "projectslice",
  initialState,
  reducers: {},
  extraReducers: {
    [createProject.pending]: (state) => {
      state.loading = true;
    },
    [createProject.fulfilled]: (state, payload) => {
      if (payload) {
        state.loading = false;
        state.message = "Submit successfully!!";
        state.error = "";
      } else {
        state.loading = false;
        state.error = "Submittion Failed!";
        state.message = "";
      }
    },

    [addCommentToProject.pending]: (state) => {
      state.loading = true;
    },
    [addCommentToProject.fulfilled]: (state, payload) => {
      if (payload) {
        state.loading = false;
        state.message = "Comment Done!!";
        state.error = "";
      } else {
        state.loading = false;
        state.error = "Comment Failed!";
        state.message = "";
      }
    },
  },
});

// export const { allProjects } = projectSlice.actions;

export default projectSlice.reducer;
