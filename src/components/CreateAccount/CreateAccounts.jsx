import React, { useState } from "react";
import "../CreateAccount/CreateAccounts.css";
import { useNavigate } from "react-router-dom";
export default function CreateAccounts() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const baseUrl = "https://fk7zu3f4gj.execute-api.eu-north-1.amazonaws.com";
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const userData = { username, password };

    try {
      const response = await fetch(`${baseUrl}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      if (!response.ok) {
        throw new Error("Något gick fel");
      }
      const data = await response.json();
      console.log("API respons", data);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h1>Skapa konto</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Användarnamn:
          <input
            type="text"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          ></input>
        </label>
        <label>
          Lösenord:
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></input>
        </label>

        <button type="submit">Skapa konto</button>
      </form>
      <button onClick={() => navigate("/")}>Tillbaka</button>
    </>
  );
}
