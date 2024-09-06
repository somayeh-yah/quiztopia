import { useEffect, useState } from "react";

export default function KryptoTunnel() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  // vi hämtar token från sessionstorage
  // se om token är legit genom att anropa API_URL/auth/account

  useEffect(() => {
    const checkToken = async () => {
      let token = "";
      token = sessionStorage.getItem("token") || "";
      // check på om det är en tom sträng
      if (token.length > 0) {
        try {
          const response = await fetch(
            "https://a1voqdpubd.execute-api.eu-north-1.amazonaws.com/account",
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `${token}`,
              },
            }
          );

          const data = await response.json();
          console.log(data);
          setLoggedIn(data.success);
          setUsername(data.account.username);
          setFirstname(data.account.firstname);
          setLastname(data.account.lastname);
        } catch (error) {
          console.error(error);
        }
      }
    };
    checkToken();
  }, []);

  return (
    <>
      {loggedIn ? (
        <article>
         <h2>Hej: {username} </h2> 
         <h3>Namn på quiz</h3>
    
        </article>
      ) : (
        <p>Du är inte inloggad</p>
      )}
    </>
  );
}
