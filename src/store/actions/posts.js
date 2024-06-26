import { ADD_POST } from "./actionTypes";
import axios from "axios";

export const addPost = post => {
  return dispatch => {
    axios.post("/posts.json", { ...post })
      .catch(err => console.log(err))
      .then(res => console.log(res.data));
  };
  return {
    type: ADD_POST,
    payload: post
  };
}