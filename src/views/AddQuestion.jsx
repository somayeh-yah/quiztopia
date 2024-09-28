import { useNavigate, useParams } from "react-router-dom";
import "../views/AddQuestion.css";
import leaflet from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
const baseUrl = "https://fk7zu3f4gj.execute-api.eu-north-1.amazonaws.com";
import loading from "../assets/loading-icon.png";

export default function AddQuestion() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [map, setMap] = useState();
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [position, setPosition] = useState();
  const [success, setSuccess] = useState(null);
  const [token, setToken] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [hasError, setHasError] = useState(false);
  const [loadingMap, setLoadingMap] = useState(true);
  const navigate = useNavigate();
  const { quizName } = useParams();
  console.log("Quiz Name:" + quizName);

  useEffect(() => {
    const checkToken = () => {
      const storedToken = sessionStorage.getItem("token") || "";
      if (storedToken && storedToken.length > 0) {
        setToken(storedToken);
      } else {
        console.log("No token found.");
      }
    };
    checkToken();
  }, []);

  function getPosition() {
    if ("geolocation" in navigator && !position?.latitude) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setPosition({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        });
      });
    }
  }

  useEffect(() => {
    if (!position?.latitude) getPosition();
  }, [position]);

  // Initiera kartan
  useEffect(() => {
    if (position?.latitude && !map) {
      const initMap = leaflet
        .map("map")
        .setView([position.latitude, position.longitude], 15);
      setMap(initMap);
      setLoadingMap(false);
    }
  }, [position]);

  useEffect(() => {
    if (map && position) {
      leaflet
        .tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 19,
          attribution:
            '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        })
        .addTo(map);

      map.on("click", (event) => {
        setLatitude(event.latlng.lat);
        setLongitude(event.latlng.lng);

        const marker = leaflet
          .marker([event.latlng.lat, event.latlng.lng])
          .addTo(map);
        marker.bindPopup("Your selected location").openPopup();
      });
    }
  }, [map]);

  async function addQuiz(event) {
    event.preventDefault();

    if (!token) {
      console.error("No token available");
      return;
    }
    if (!question || !answer) {
      setErrorMessage("All fields are required!");
      setHasError(true);
      return;
    }

    const quizData = {
      name: quizName,
      question,
      answer,
      location: {
        longitude,
        latitude,
      },
    };
    console.log("Data to be sent:", quizData);

    try {
      const response = await fetch(`${baseUrl}/quiz/question`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify(quizData),
      });
      const data = await response.json();

      if (response.ok) {
        console.log("Question added successfully:", data);
        setSuccess(true);
        setQuestion("");
        setAnswer("");
      } else {
        console.error("API Error:", data.message || data);
        setSuccess(false);
      }
    } catch (error) {
      console.error("Error:", error);
      setSuccess(false);
    }
  }

  return (
    <>
      <button onClick={() => navigate("/display-all-Quizes")}>
        All Quizzes
      </button>
      <button onClick={() => navigate("/")}>Go back</button>

      <article className="addQuestion-container">
        <form className="addQuestion-form" onSubmit={addQuiz}>
          {hasError && <p className="error">{errorMessage}</p>}

          <input
            type="text"
            placeholder="Enter quiz question..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Enter quiz answer..."
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            required
          />

          <button type="submit">Save</button>
        </form>
      </article>

      {loadingMap && (
        <p className="loading-container">
          <img className="loading-icon" src={loading} alt="loading" />
          Laddar Karta...
        </p>
      )}

      {success !== null && (
        <div>
          {success ? (
            <p>Snyggt jobbat!</p>
          ) : (
            <p>Tyvärr gick det inte att lägga till frågan.</p>
          )}
        </div>
      )}

      <section id="map"></section>
    </>
  );
}
