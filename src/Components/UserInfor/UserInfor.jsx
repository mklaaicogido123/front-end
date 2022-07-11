import React from "react";
import "./userInfor.css";

const UserInfor = ({ user }) => {
  return (
    <div>
      <div className="userInfor">
        <b>User information</b>
        <p>Description:{user.about}</p>
        <p>gender:{user.gender}</p>
        <p>location:{user.location}</p>
        <div className="userFriend"></div>
      </div>
    </div>
  );
};

export default UserInfor;
