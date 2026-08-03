import React from "react";
import { Link } from "react-router-dom";

interface LoginResponseProp {
  message: string;
  jwt: string;
}

const LoginPage = () => {

  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");

  const handleLoginResponse = (data: LoginResponseProp) => {
    alert(data.message)
    console.log(data)
    setEmail(""); setPassword("");

  };

  const handleLogin = () => {
    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then(handleLoginResponse)
      .catch((data) => alert(data.message));
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
        New user?
        <Link to="/register"> Register</Link>
      </div>
    </>
  );
};

export default LoginPage;
