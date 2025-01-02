/* eslint-disable react/prop-types */
import { useQuery } from "@tanstack/react-query";
import { Navigate } from "react-router-dom";
import { checkAuthStatus } from "../../APIServices/users/userAPI";
import Loader from "../Loader/Loader";

const AuthRoute = ({ children }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["user-auth"],
    queryFn: checkAuthStatus,
  });

  if(isLoading) return <Loader />

  if(!data) {
    return <Navigate to='/login'/>
  }

  return children;
};

export default AuthRoute;
