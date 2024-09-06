import { useNavigate, useParams } from "react-router-dom";
import "../views/AddQuestion.css";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import AddMarker from "../components/MapComponent/AddMarker";
const baseUrl = "https://fk7zu3f4gj.execute-api.eu-north-1.amazonaws.com";
import loading from "../assets/loading-icon.png";
import { MapContainer, TileLayer } from "react-leaflet";

export default function AddQuestion() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [position, setPosition] = useState([57.7089, 11.9746]);
  const [latitude, setLatitud] = useState("");
  const [longitud, setLongitud] = useState("");
  const [token, setToken] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [hasError, setHasError] = useState(false);
  const navigate = useNavigate();
  const { quizName } = useParams();
  console.log("Quiz Name:" + quizName);

  useEffect(() => {
    const checkToken = async () => {
      const storedToken = sessionStorage.getItem("token") || "";
      // check på om det är en tom sträng
      console.log("token", storedToken);

      if (storedToken.length > 0) {
        setToken(storedToken);
      }
    };
    checkToken();
  }, []);

  async function addQuiz(event) {
    event.preventDefault();
    if (!question || !answer) {
      setErrorMessage("All fields are required!");
      setHasError(true);
      return;
    }
    if (token) {
      
      console.log("click");
      try {
        const response = await fetch(`${baseUrl}/quiz/question `, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
          body: JSON.stringify({
            name: quizName,
            question: question,
            answer: answer,
            location: {
              longitude: position[1].toString(),
              latitude: position[0].toString(),
            },
          }),
        });
        const data = await response.json();
        console.log(data);
        sessionStorage.setItem("token", data.token);
      
        navigate("/display-all-Quizes");
      } catch (error) {
        console.error(error);
      }
    }
  }

  // const saveQuiz = (event) => {
  //   event.preventDefault();

  //   if (!question || !answer ) {
  //       alert("All fields are required!");
  //       return;
  //     }
  //   const quizData = {
  //     // user: username,
  //     answer: answer,
  //     question: question,
  //     position: position,
  //   };

  //   const savedQuizes = JSON.parse(sessionStorage.getItem("quizzes") || "[]");
  //   savedQuizes.push(quizData);
  //   sessionStorage.setItem("quizzes", JSON.stringify(savedQuizes));

  //   navigate("/display-all-Quizes");
  // };

  return (
    <section>
      <button onClick={() => navigate("/")}>Go back</button>
      <article className="addQuestion-container">
        
        <form className="addQuestion-form" onSubmit={addQuiz}>
        {hasError && <p className="error">{errorMessage}</p>}
          <label>
            Fråga:
            <input
              type="text"
              placeholder="Enter quiz..."
              value={question}
              onChange={(e) => {
                setQuestion(e.target.value);
              }}
            ></input>
          </label>
          <label>
            Svar:
            <input
              type="text"
              placeholder="Enter answer..."
              value={answer}
              onChange={(e) => {
                setAnswer(e.target.value);
              }}
            ></input>
          </label>
          <button onClick={addQuiz} type="submit">
            Save
          </button>
        </form>
      </article>
      {position ? (
        <MapContainer
          center={position}
          zoom={13}
          scrollWheelZoom={false}
          style={{ width: "100%", height: "500px" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <AddMarker />
        </MapContainer>
      ) : (
        <p className="loading">
          <img className="loading-icon" src={loading} />
          Laddar Karta...
        </p>
      )}
      <section id="map"></section>
    </section>
  );
}
