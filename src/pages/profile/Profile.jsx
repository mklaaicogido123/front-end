import React, { useEffect, useState } from "react";
import Post from "../../Components/Post/Post";
import "./profile.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import UserInfor from "../../Components/UserInfor/UserInfor";
import SideBar from "../../Components/SideBar/SideBar";

const Profile = () => {
  const [user, setUser] = useState({});
  const { username } = useParams();
  const fetchUser = async () => {
    const res = await axios.get(`/user/${username}`);
    setUser(res.data);
    console.log(res.data);
  };

  useEffect(() => {
    fetchUser();
    // eslint-disable-next-line
  }, [username]);

  return (
    <>
      <div className="profile">
        <img
          src="https://mondaycareer.com/wp-content/uploads/2020/11/background-%C4%91%E1%BA%B9p-3-1024x682.jpg"
          className="profile_background"
          alt="backgroundProfile"
        />
        <img src={user.image} alt="avatar" className="profile_avatar" />
        <div className="profile_Infor">
          <h3>{user.name}</h3>
        </div>
        <div className="profile_bot">
          <SideBar />
          <Post username={username} />
          <UserInfor user={user} />
        </div>
      </div>
    </>
  );
};

export default Profile;
