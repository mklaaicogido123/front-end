import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUser } from "../../redux/apiRequest";
import "./sidebar.css";
import { Link } from "react-router-dom";

const SideBar = () => {
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.user?.users.allUser);

  useEffect(() => {
    const handleGetAllUsers = () => {
      getAllUser(dispatch);
    };
    handleGetAllUsers();
  }, []);
  return (
    <div className="sidebar">
      <div className="sidebar_friendList">
        <h2>User list</h2>
        {userList?.map((user) => {
          return (
            <Link
              to={"/profile/" + user.name}
              className="friend"
              style={{ textDecoration: "none", color: "black" }}
            >
              <img src={user.image} alt="avatar" className="friend_avatar" />
              <div className="friend_name"> {user.user_name} </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default SideBar;
