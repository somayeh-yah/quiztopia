import React, { useState } from "react";
import "../CreateAccount/CreateAccounts.css";
import { useNavigate } from "react-router-dom";
export default function CreateAccounts() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [hasError, setHasError] = useState(false);
  const baseUrl = "https://fk7zu3f4gj.execute-api.eu-north-1.amazonaws.com";
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!username || !password) {
      setErrorMessage("Please fill in all fields.");
      setHasError(true);
      return;
    }

    const userData = { username, password };

    try {
      const response = await fetch(
       `${baseUrl}/auth/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );
      if (!response.ok) {
        throw new Error("Något gick fel");
      }
      const data = await response.json(userData);
      console.log("API respons", data);

      if (data.success) {
        // Om användarkontot skapas, navigera till inloggningssidan
        navigate("/");
      } else {
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h2>Skapa konto</h2>
      {hasError && <p className="error">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          placeholder="Enter username..."
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          className={hasError && !username ? "error-input" : ""}
        ></input>

        <input
          type="password"
          value={password}
          placeholder="Enter password..."
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          className={hasError && !password ? "error-input" : ""}
        ></input>

        <button type="submit">Skapa konto</button>
      </form>
      <button onClick={() => navigate("/")}>Tillbaka</button>
    </>
  );
}
