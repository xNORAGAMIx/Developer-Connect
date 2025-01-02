//create that must return a promise
import axios from "axios";

axios.defaults.withCredentials = true;

const BASE_URL = "http://localhost:5000/api/v1/posts";

//Create post api
export const createPostAPI = async (postData) => {
  console.log(postData);
  const response = await axios.post(`${BASE_URL}/create`, postData);
  return response.data;
};

//List post api
export const listPostsAPI = async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
};

//Get post api
export const getPostAPI = async (postId) => {
  const response = await axios.get(`${BASE_URL}/${postId}`);
  return response.data;
};

//Update post api
export const updatePostAPI = async (postData) => {
  const response = await axios.put(`${BASE_URL}/${postData?.id}`, {
    title: postData.title,
    description: postData.description,
  });
  return response.data;
};

//Delete post api
export const deletePostAPI = async (postId) => {
  const response = await axios.delete(`${BASE_URL}/${postId}`);
  return response.data;
};
