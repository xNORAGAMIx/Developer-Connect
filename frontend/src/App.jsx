import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreatePost from "./components/Posts/CreatePost";
import ListPosts from "./components/Posts/ListPosts";
import PublicNavbar from "./components/Navbar/PublicNavbar";
import HomePage from "./components/Home/HomePage";
import UpdatePost from "./components/Posts/UpdatePost";

const App = () => {
  return (
    <BrowserRouter>
      {/*Navbar */}
      <PublicNavbar />
      <Routes>
        {/* Home */}
        <Route path="/" element={<HomePage/>}/>
        {/* Create Post */}
        <Route path="/create-post" element={<CreatePost />} />
        {/* List Posts */}
        <Route path="/list-posts" element={<ListPosts />} />
        {/* Single Post */}
        <Route path="/posts/:id" element={<UpdatePost />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
