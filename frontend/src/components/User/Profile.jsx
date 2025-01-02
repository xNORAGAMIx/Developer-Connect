import { useSelector } from "react-redux";
const Profile = () => {
  //user data
  const { userAuth } = useSelector((state) => state.auth);

  return <div>{userAuth?.username} profile</div>;
};

export default Profile;
