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
      console.error("Submission error:", error);
      setErrorMessage("An error occurred while creating the account. Please try again.");
    }
    

    return (
      <>
        <h1>Come and play Quiz with us</h1>
        <article>
        {hasError && <p className="error">{errorMessage}</p>}
          <h2>Logga in:</h2>
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
            <button type="submit">Logga in</button>
          </form>
          <button onClick={()=> navigate("/create-account")}>
            Skapa ett konto
          </button>
          <button
            id="secret-btn"
            type="button"
            className="secret-button"
            onClick={() => setShowSecret(true)}
          >
            Visa info
          </button>
          {showSecret ? <KryptoTunnel /> : null}
        </article>
      </>
    );
  };
}
