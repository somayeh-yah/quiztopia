import { useNavigate, useParams } from "react-router-dom";
import "../views/AddQuestion.css";
// import L from "leaflet";
import leaflet from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
// import AddMarker from "../components/MapComponent/AddMarker";
const baseUrl = "https://fk7zu3f4gj.execute-api.eu-north-1.amazonaws.com";
import loading from "../assets/loading-icon.png";

export default function AddQuestion() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  // const [position, setPosition] = useState([57.7089, 11.9746]);
  const [map, setMap] = useState(null);
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [token, setToken] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [hasError, setHasError] = useState(false);
  const navigate = useNavigate();
  const { quizName } = useParams();
  console.log("Quiz Name:" + quizName);

  function getPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const long = position.coords.longitude;
        setLatitude(lat);
        setLongitude(long);
      });
    }
  }

  useEffect(() => {
   getPosition()
  }, []);
  useEffect(() => {
    if (latitude && longitude && !map) {
      const initMap = leaflet
        .map('map')
        .setView([latitude, longitude], 15);

      setMap(initMap);

      leaflet
      .tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      })
      .addTo(initMap);

      initMap.on("click", (event) => {
        const { lat, lng } = event.latlng;
        setLatitude(lat);
        setLongitude(lng);
        leaflet.marker([lat, lng]).addTo(initMap);
      });
    }
    
  }, [latitude, longitude, map]);


  useEffect(() => {
    const checkToken = async () => {
      const storedToken = sessionStorage.getItem("token") || "";
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
              longitude: longitude.toString(),
              latitude: latitude.toString(),
            },
          }),
        });
        const data = await response.json();
        console.log(data);
        sessionStorage.setItem("token", data.token);

       
      } catch (error) {
        console.error(error);
      }
    }
  }

  const saveQuiz = (event) => {
    event.preventDefault();

    if (!question || !answer) {
     setErrorMessage("All fields are required!");
     setHasError(true);
      return;
    }
    const quizData = {
     question: question,
      answer: answer,
      // longitude: position.longitude,
      // latitude:position.latitude
    };
console.log("data:" ,quizData);

    const savedQuizes = JSON.parse(sessionStorage.getItem("quizzes") || "[]");
    savedQuizes.push(quizData);
    sessionStorage.setItem("quizzes", JSON.stringify(savedQuizes));
  };

  return (
    <>
      <button onClick={() => navigate("/display-all-Quizes")}>All Quizezz</button>
      <button onClick={() => navigate("/")}>Go back</button>
      <article className="addQuestion-container">
        <form className="addQuestion-form" onSubmit={addQuiz}>
          {hasError && <p className="error">{errorMessage}</p>}
        
            <input
              type="text"
              placeholder="Enter quiz..."
              value={question}
              onChange={(e) => {
                setQuestion(e.target.value);
              }}
            ></input>
         
         
            <input
              type="text"
              placeholder="Enter answer..."
              value={answer}
              onChange={(e) => {
                setAnswer(e.target.value);
              }}
            ></input>
         
          <button onClick={saveQuiz} type="submit">
            Save
          </button>
        </form>
      </article>

      <p className="loading-container">
        <img className="loading-icon" src={loading} />
        Laddar Karta...
      </p>
      
      <section id="map" ></section>
    </>
  );
}
