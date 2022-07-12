import React from "react";
import Post from "../../Components/Post/Post";
import SideBar from "../../Components/SideBar/SideBar";
import "./Home.css";

const Home = () => {
  return (
    <div className="home">
      <SideBar />
      <div className="home_center">
        <Post />
      </div>
    </div>
  );
};

export default Home;
