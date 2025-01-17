import axios from "axios";
//create that must return a promise
const BASE_URL = "http://localhost:5000/api/v1/plans";

//!Create plan api
export const addPlanAPI = async (planData) => {
  // console.log(planData);
  const response = await axios.post(`${BASE_URL}/create`, planData, {
    withCredentials: true,
  });
  return response.data;
};

//! Fetch all plans
export const fetchPlanAPI = async () => {
  const plans = await axios.get(`${BASE_URL}/list`);
  return plans.data;
};

//! Fetch single plan
export const fetchSinglePlanAPI = async (id) => {
  const plan = await axios.get(`${BASE_URL}/${id}`);
  return plan.data;
};
