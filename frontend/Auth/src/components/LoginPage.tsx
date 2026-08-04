import React from "react";
import { Link, useNavigate } from "react-router-dom";

interface LoginResponseProp {
  message: string;
}

const LoginPage = () => {

  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const navigate = useNavigate()

  const handleLogin = async () => {

    try {

      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      const data: LoginResponseProp = await response.json()
      if (!response.ok)
        throw new Error(data.message)


      
      alert("Login Success")
      navigate("/user")

    } catch (e) {

      alert(e)
      setEmail(""); setPassword("");
    
    }

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
