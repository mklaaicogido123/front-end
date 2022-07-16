import "./login.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginUser } from "../../redux/apiRequest";
import { useDispatch } from "react-redux";
import { Button, Input } from "@chakra-ui/react";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const newUser = {
      username: username,
      password: password,
    };
    loginUser(newUser, dispatch, navigate);
  };
  return (
    <section className="login-container">
      <div className="login-title"> Log in</div>
      <form onSubmit={handleLogin}>
        <label>USERNAME</label>
        <Input
          type="text"
          placeholder="Enter your username"
          onChange={(e) => setUsername(e.target.value)}
          style={{ background: "white" }}
        />
        <label>PASSWORD</label>
        <Input
          type="password"
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
          style={{ background: "white" }}
        />
        <Button
          style={{ margin: "20px 0px ", background: "rgb(247, 74, 96)" }}
          type="submit"
        >
          Continue
        </Button>
      </form>
      {/* <div className="login-register"> Don't have an account yet? </div>
            <Link className="login-register-link" to="/register">Register one for free </Link> */}
    </section>
  );
};

export default Login;
