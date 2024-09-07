import "./LoginForm.css";
import { useState } from "react";
import KryptoTunnel from "../components/KryptoTunnel";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showSecret, setShowSecret] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [hasError, setHasError] = useState(false);
  const navigate = useNavigate();
  const baseUrl = "https://fk7zu3f4gj.execute-api.eu-north-1.amazonaws.com";

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!username || !password) {
      setErrorMessage("Please fill in all fields.");
      setHasError(true);
      return;
    }

    const userData = { username, password };

    try {
      console.log(userData);
      const response = await fetch(`${baseUrl}/auth/login `, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      console.log(data);
      sessionStorage.setItem("token", data.token);
      navigate("/add-quiz");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {hasError && <p className="error">{errorMessage}</p>}

      <h2>Logga in:</h2>
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
          className={hasError && !username ? "error-input" : ""}
        ></input>

        <button type="submit">Logga in</button>
      </form>
      <button onClick={() => navigate("/create-account")}>Skapa konto</button>
      <button
        id="secret-btn"
        type="button"
        className="secret-button"
        onClick={() => setShowSecret(true)}
      >
        Visa info
      </button>
      {showSecret ? <KryptoTunnel /> : null}
    </>
  );
}
