import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {  SocialNetworkState } from "../../interfaces";
import axios from "axios";

const initialState: SocialNetworkState = {
  theme: "light",
  posts: [],
  commentState: [],
};

const slice = createSlice({
  name: "socialNetwork",
  initialState,
  reducers: {
    setTheme(state) {
      state.theme = state.theme == "light" ? "dark" : "light";
    },
    toggleComment(state, action: PayloadAction<{ id: number }>) {
      console.log("ЗАХОДИТ");
      
      const commentExist = state.commentState.find(
        (el) => el.id === action.payload.id
      );
      if (commentExist) {
        state.commentState = state.commentState.map((el) => {
          return action.payload.id == el.id ? { ...el, active: !el.active } : el;
        });
      } else {
        state.commentState.push({
          id: action.payload.id,
          active: true,
        });
      }
    },
  },
  extraReducers(builder) {
    builder.addCase(allPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
    });
  },
});

export const getSingleUserName = createAsyncThunk(
  "socialNetwork/getSingleUserName",
  async function (userID: number): Promise<string> {
    const response = await axios.get(`https://dummyjson.com/users/${userID}`);
    return `${response.data.firstName} ${response.data.lastName}`;
  }
);

export const getSingleUserData = createAsyncThunk(
  "socialNetwork/getSingleUserName",
  async function (userID: number): Promise<string> {
    const response = await axios.get(`https://dummyjson.com/users/${userID}`);
    return response.data;
  }
);

export const allPosts = createAsyncThunk(
  "socialNetwork/allPosts",
  async function () {
    const response = await axios.get("https://dummyjson.com/posts");
    return response.data.posts;
  }
);

export const getUsersPosts = createAsyncThunk(
  "socialNetwork/getUsersPosts",
  async function (userId: number) {
    const response = await axios.get(
      `https://dummyjson.com/posts/user/${userId}`
    );
    return response;
  }
);

export const getPostsComments = createAsyncThunk(
  "socialNetwork/getPostsComments",
  async function (id: number) {
    const response = await axios.get(
      `https://dummyjson.com/comments/post/${id}`
    );
    return response.data;
  }
);

export const { setTheme, toggleComment } = slice.actions;

export default slice.reducer;
