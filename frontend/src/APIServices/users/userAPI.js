import axios from "axios";

const BASE_URL = "http://localhost:5000/api/v1/users";

//Register user api
export const registerUser = async (userData) => {
  const response = await axios.post(
    `${BASE_URL}/register`,
    {
      username: userData?.username,
      email: userData?.email,
      password: userData?.password,
    },
    {
      withCredentials: true,
    }
  );
  return response.data;
};

//Login user api
export const loginUser = async (userData) => {
  const response = await axios.post(
    `${BASE_URL}/login`,
    {
      email: userData?.email,
      password: userData?.password,
    },
    {
      withCredentials: true,
    }
  );
  return response.data;
};

// Authentication api
export const checkAuthStatus = async () => {
  const response = await axios.get(`${BASE_URL}/checkAuthenticated`, {
    withCredentials: true,
  });
  return response.data;
};

// User Profile
export const userProfileAPI = async () => {
  const response = await axios.get(`${BASE_URL}/profile`, {
    withCredentials: true,
  });
  return response.data;
};

//Logout user api
export const logoutUser = async () => {
  const response = await axios.post(
    `${BASE_URL}/logout`,
    {},
    {
      withCredentials: true,
    }
  );
  return response.data;
};
