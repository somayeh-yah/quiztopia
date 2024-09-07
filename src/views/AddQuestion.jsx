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
  const [position, setPosition] = useState([57.7089, 11.9746]);
  const [map, setMap] = useState();
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [token, setToken] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [hasError, setHasError] = useState(false);
  const navigate = useNavigate();
  const { quizName } = useParams();
  console.log("Quiz Name:" + quizName);

  function getPosition() {
    if ('geolocation' in navigator && !position?.latitude) {
      navigator.geolocation.getCurrentPosition((position) => {
        setPosition(position.coords);
      });
    }
  }

  useEffect(() => {
    if (!position?.latitude) {
      getPosition();
    }
  }, []);
  useEffect(() => {
    if (position?.latitude && !map) {
      const myMap = leaflet
        .map('map')
        .setView([position?.latitude, position?.longitude], 15);

      setMap(myMap);
    }
  }, [position]);

  useEffect(() => {
    if (map && position) {
      leaflet
        .tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution:
            '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        })
        .addTo(map);

      const marker = leaflet
        .marker([position?.latitude, position?.longitude])
        .addTo(map);

      marker.bindPopup('Detta är Jensen YH');

      map.on('click', (event) => {
        console.log(event);
        const marker = leaflet
          .marker([event.latlng.lat, event.latlng.lng])
          .addTo(map);

          setLatitude(event.latlng.lat);
          setLongitude(event.latlng.lng)
      });

      marker.on('click', () => {
        console.log('Du klickade på Jensen YH');
      });
    }
  }, [map]);

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
      longitude: position.longitude,
      latitude:position.latitude
    };
console.log("data:" ,quizData);

    const savedQuizes = JSON.parse(sessionStorage.getItem("quizzes") || "[]");
    savedQuizes.push(quizData);
    sessionStorage.setItem("quizzes", JSON.stringify(savedQuizes));

    // navigate("/display-all-Quizes");
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
      
      <section id="map"></section>
    </>
  );
}
