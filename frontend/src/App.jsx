import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreatePost from "./components/Posts/CreatePost";
import ListPosts from "./components/Posts/ListPosts";
import PublicNavbar from "./components/Navbar/PublicNavbar";
import PrivateNavbar from "./components/Navbar/PrivateNavbar";
import Home from "./components/Home/Home";
//import UpdatePost from "./components/Posts/UpdatePost";
import PostDetails from "./components/Posts/PostDetails";
import Login from "./components/User/Login";
import Register from "./components/User/Register";
import Profile from "./components/User/Profile";

import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { checkAuthStatus } from "./APIServices/users/userAPI";
import { useEffect } from "react";
import { isAuthenticated } from "./redux/slices/authSlice";
import AuthRoute from "./components/AuthRoute/AuthRoute";
import UserDashbaord from "./components/User/UserDashboard";
import AccountSummaryDashboard from "./components/User/AccountSummaryDashboard";
import AddCategory from "./components/Category/AddCategory";

const App = () => {
  const { userAuth } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const { data } = useQuery({
    queryKey: ["user-login"],
    queryFn: checkAuthStatus,
  });

  useEffect(() => {
    if (data) {
      dispatch(isAuthenticated(data));
    }
  }, [data, dispatch]);

  return (
    <BrowserRouter>
      {/*Navbar */}

      {userAuth ? <PrivateNavbar /> : <PublicNavbar />}

      <Routes>
        {/* Home */}
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<UserDashbaord />}>
          {/*Account Summary */}
          <Route
            path=""
            element={
              <AuthRoute>
                <AccountSummaryDashboard />
              </AuthRoute>
            }
          />
          {/*Create Post */}
          <Route
            path="create-post"
            element={
              <AuthRoute>
                <CreatePost />
              </AuthRoute>
            }
          />
          <Route
            path="add-category"
            element={
              <AuthRoute>
                <AddCategory />
              </AuthRoute>
            }
          />
        </Route>
        {/* Create Post */}
        {/* List Posts */}
        <Route path="/posts" element={<ListPosts />} />
        {/* Single Post */}
        {/* Single Post */}
        {/* <Route path="/posts/:id" element={<UpdatePost />} /> */}
        <Route path="/posts/:id" element={<PostDetails />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/profile"
          element={
            <AuthRoute>
              <Profile />
            </AuthRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
