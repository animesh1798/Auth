import React from "react";
import { useNavigate } from 'react-router-dom'

interface RegBodyProp {
  jwt: string;
  message: string;
}

const RegisterPage = () => {
  const [name, setName] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [regResponse, setRegResponse] = React.useState<string>("")
  const navigate = useNavigate()

  const handleRegData = (data: RegBodyProp) => {
    console.log(data)
  };

  const handleRegistration = () => {
    fetch("http://localhost:3000/register", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    })
      .then((res) => {
        res.ok ? navigate("/") : res.json().then(data => setRegResponse(data.message))
      })
  };

  return (
    <>
      <div className="registration-page-card">
        <input
          type="text"
          className="name"
          placeholder="Name..."
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <input
          type="text"
          className="email"
          placeholder="Email..."
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <input
          type="password"
          className="password"
          placeholder="Password..."
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button className="register" onClick={handleRegistration}>
          Register
        </button> <br />
        <span className="reg-response">{regResponse}</span>
      </div>
    </>
  );
};

export default RegisterPage;
