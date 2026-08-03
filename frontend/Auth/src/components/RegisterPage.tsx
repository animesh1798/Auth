import React from "react";

interface RegBodyProp {
  jwt: string;
  message: string;
}

const RegisterPage = () => {
  const [name, setName] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");

  const handleRegData = (data: RegBodyProp) => {
    console.log(data);
  };

  const handleRegistration = () => {
    fetch("http://localhost:3000/register", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    })
      .then((res) => res.json())
      .then((data) => handleRegData(data));
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
        </button>
      </div>
    </>
  );
};

export default RegisterPage;
