import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreatePost from "./components/Posts/CreatePost";
import ListPosts from "./components/Posts/ListPosts";
import PublicNavbar from "./components/Navbar/PublicNavbar";
import Home from "./components/Home/Home";
import UpdatePost from "./components/Posts/UpdatePost";
import PostDetails from "./components/Posts/PostDetails";
import Login from "./components/User/Login";
import Register from "./components/User/Register";

const App = () => {
  return (
    <BrowserRouter>
      {/*Navbar */}
      <PublicNavbar />
      <Routes>
        {/* Home */}
        <Route path="/" element={<Home/>}/>
        {/* Create Post */}
        <Route path="/create-post" element={<CreatePost />} />
        {/* List Posts */}
        <Route path="/posts" element={<ListPosts />} />
        {/* Single Post */}
        {/* Single Post */}
        {/* <Route path="/posts/:id" element={<UpdatePost />} /> */}
        <Route path="/posts/:id" element={<PostDetails />} />

        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
