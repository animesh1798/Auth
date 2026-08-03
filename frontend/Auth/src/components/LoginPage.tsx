import React from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {

  const navigate = useNavigate()
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");


  const handleLoginResponse = (data: String) => {
    console.log(data)
  } 

  const handleLogin = () => {

    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((data) => handleLoginResponse(data));
  };

  const handleRegister = () => {
    navigate('/register')
  };

  return (
    <>
      <div className="login-card">
        <input
          type="text"
          className="email"
          placeholder="Email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <input
          type="password"
          className="password"
          placeholder="Password..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button className="login" onClick={handleLogin}>
          Login
        </button>
        <button className="register" onClick={handleRegister}>
          Register
        </button>
      </div>
    </>
  );
};


export default LoginPage