import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import leaflet from "leaflet";
import "leaflet/dist/leaflet.css";

export default function Quiz() {
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [position, setPosition] = useState(null);
  const [map, setMap] = useState(null);
  const navigate = useNavigate();
  const { userId, quizId } = useParams();

  const baseUrl = "https://fk7zu3f4gj.execute-api.eu-north-1.amazonaws.com";

  useEffect(() => {
    const getQuiz = async () => {
      try {
        const response = await fetch(`${baseUrl}/quiz/${userId}/${quizId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch quiz data.");
        }

        const data = await response.json();
        setQuiz(data.quiz);
        setLoading(false);
      } catch (error) {
        setErrorMessage("Something went wrong, please try again later.");
        setLoading(false);
      }
    };

    getQuiz();
  }, [userId, quizId]);

  useEffect(() => {
    if (!position) {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((pos) => {
          setPosition({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          });
        });
      } else {
        setErrorMessage("position not find.");
      }
    }
  }, [position]);

  useEffect(() => {
    if (position && !map && document.getElementById("map")) {
      const initMap = leaflet
        .map("map")
        .setView([position.latitude, position.longitude], 15);

      leaflet
        .tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 20,
          attribution:
            '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        })
        .addTo(initMap);

      setMap(initMap);
    }
  }, [position, map]);

  useEffect(() => {
    if (map && quiz?.questions) {
      quiz.questions.forEach((question) => {
        const { latitude, longitude } = question.location;

        const lat = parseFloat(latitude);
        const lng = parseFloat(longitude);

        const marker = leaflet.marker([lat, lng]).addTo(map);
        marker.bindPopup(`
  <article style="font-size:16px; color:#d382d5; ">
    <b>Question:</b> ${
      question.question ? question.question : "No quiz name available."
    }<br/>
    <b>Answer:</b> ${
      question.answer ? question.answer : "No answer provided."
    }<br/>
    <b>Location:</b> Latitude: ${lat}, Longitude: ${lng}
  </article>
`);
      });
    }
  }, [map, quiz]);

  if (errorMessage) {
    return <p className="error-message">{errorMessage}</p>;
  }

  return (
    <section className="quiz-container">
      <h1>{`Quiz: ${quiz?.quizId}`}</h1>

      <section id="map"></section>
      <button onClick={() => navigate("/display-all-Quizes")}>Go Back</button>
    </section>
  );
}
