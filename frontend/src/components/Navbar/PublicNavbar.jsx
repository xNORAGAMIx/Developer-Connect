import { Link } from "react-router-dom";

const PublicNavbar = () => {
  return (
    <nav>
      <ul className="flex space-x-2 font-extrabold text-xl">
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/create-post'>Create Posts</Link>
        </li>
        <li>
          <Link to='/list-posts'>List Posts</Link>
        </li>
      </ul>
    </nav>
  );
};

export default PublicNavbar;
