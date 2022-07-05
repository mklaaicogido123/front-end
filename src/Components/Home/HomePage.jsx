import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUser } from "../../redux/apiRequest";
import "./home.css";

const HomePage = () => {
  const user = useSelector((state) => state.auth.login.currentUser);
  const dispatch = useDispatch();
  //DUMMY DATA
  // const userData = [
  //   {
  //     username: "anhduy1202",
  //   },
  //   {
  //     username: "kelly1234",
  //   },
  //   {
  //     username: "danny5678",
  //   },
  //   {
  //     username: "kenny1122",
  //   },
  //   {
  //     username: "jack1234",
  //   },
  //   {
  //     username: "loi1202",
  //   },
  //   {
  //     username: "nhinhi2009",
  //   },
  //   {
  //     username: "kellynguyen1122",
  //   },

  // ];
  const userList = useSelector((state) => state.user?.users.allUser)
  const handleGetAllUsers = () => {
    if (user?.accessToken) {
      getAllUser(user?.accessToken, dispatch);
    }
  }
  useEffect(() => {
    // if(!user){
    //   navigate("/login");
    // }

    handleGetAllUsers();
  }, [])
  return (
    <main className="home-container">
      <div className="home-title">Number of user {userList?.length}</div>
      <div className="home-userlist">
        {userList?.map((user) => {
          return (
            <div className="user-container">
              <div className="home-user">{user.user_name}</div>
              <div className="delete-user"> Delete </div>
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default HomePage;
