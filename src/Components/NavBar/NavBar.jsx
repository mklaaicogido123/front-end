
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./navbar.css";
import { useDispatch } from "react-redux";
import { logOutUser } from "../../redux/apiRequest";
const NavBar = () => {
  const user = useSelector((state)=> state.auth.login.currentUser);
  const dispatch =useDispatch();
  const handleLogout =() =>{
    logOutUser(dispatch);
  }
  return (
    <nav className="navbar-container">
      
      {user? (
        <>
        <Link to="/" className="navbar-text"> Home </Link>
        <p className="navbar-text">Hi, <span> {user.user_name}  </span> </p>
        {/* <Link to="/logout" className="navbar-logout" > Log out</Link> */}
                <button onClick={handleLogout} className="navbar-text"> logout </button>
        </>
      ) : (    
        <>
      <Link to="/login" className="navbar-text"> Login </Link>
      </>
)}
    </nav>
  );
};

export default NavBar;
