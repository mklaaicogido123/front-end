import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";
import { useDispatch } from "react-redux";
import { logOutUser } from "../../redux/apiRequest";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";
import { getAllUser } from "../../redux/apiRequest";
import { useEffect } from "react";

const NavBar = () => {
  const user = useSelector((state) => state.auth.login.currentUser);
  const userList = useSelector((state) => state.user?.users.allUser);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const handleLogout = () => {
    logOutUser(dispatch);
  };
  const handleSearchUser = (e) => {
    e.preventDefault();
    navigate("/profile/" + search);
    setSearch("");
  };
  const handleGetAllUser = (e) => {
    getAllUser(dispatch);
  };
  useEffect(() => {
    handleGetAllUser();
  }, []);
  return (
    <nav className="navbar-container">
      {user ? (
        <>
          {/* <Link to="/" className="navbar-text"> Home </Link>
        <p className="navbar-text">Hi, <span> {user.user_name}  </span> </p>
       
                 */}
          <div className="navbar-left">DuyPhong APP</div>
          <div className="navbar-center">
            <FaSearch className="navbar-center-left" />
            <form className="navbar-center-right" onSubmit={handleSearchUser}>
              <input
                type="text"
                placeholder="search"
                onChange={(e) => setSearch(e.target.value)}
                value={search}
                style={{ margin: 0 }}
              />
              <div
                style={{ background: "white", width: "100%", color: "black" }}
              >
                {userList?.map((user) => {
                  if (
                    search
                      .toLowerCase()
                      .trim()
                      .includes(user.name.toLowerCase().trim())
                  ) {
                    return (
                      <Link
                        to={"/profile/" + user.name}
                        className="navbar-text"
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        {user.name}
                      </Link>
                    );
                  }
                  return <></>;
                })}
              </div>
            </form>
          </div>
          <div className="navbar-right">
            <Link
              to={"/profile/" + user.name}
              className="navbar-text"
              style={{ textDecoration: "none" }}
            >
              <img src={user.image} alt="avatar" className="avatar" />
            </Link>
            <Link
              to="/home"
              className="navbar-text"
              style={{ textDecoration: "none" }}
            >
              Home
            </Link>
            <button onClick={handleLogout} className="btn-logout">
              Logout
            </button>
          </div>
        </>
      ) : (
        <>
          <Link to="/login" className="navbar-text">
            Login
          </Link>
        </>
      )}
    </nav>
  );
};

export default NavBar;
