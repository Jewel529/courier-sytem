import React from "react";
import { Button } from "react-bootstrap";
import { useHistory, useLocation } from "react-router";
import useAuth from "../../hooks/useAuth";
import "./Login.css";

const Login = () => {
  const { signInUsingGoogle, setUser, setLoading } = useAuth();
  const history = useHistory();
  const location = useLocation();
  const url = location.state?.from || "/home";

  const handleGoogle = () => {
    signInUsingGoogle()
      .then((result) => {
        setLoading(true);
        const user = result.user;
        setUser(user);
        history.push(url);
        console.log("from login file", user);
      })
      .finally(() => setLoading(false));

    // ...
  };
  return (
    <div className="main-login-container">
      <h1 className="text-danger fw-bold  ">Please Register</h1>
      <div className="login-container">
        <h1 className="fw-bold text-success fs-4">Sign In with Google</h1>
        <Button className="btn-warning" onClick={handleGoogle}>
          Google
        </Button>
      </div>
    </div>
  );
};

export default Login;
