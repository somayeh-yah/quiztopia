import { useState, useEffect } from "react";
import "../views/DisplayAllQuizes.css";
import { useNavigate} from "react-router-dom";
import "leaflet/dist/leaflet.css"; 

export default function DisplayAllQuizzes() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 
  const navigate = useNavigate();

  const baseUrl = "https://fk7zu3f4gj.execute-api.eu-north-1.amazonaws.com";

  useEffect(() => {
    async function getAllQuizzes() {
      try {
        const response = await fetch(`${baseUrl}/quiz`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setQuizzes(data.quizzes); 
        setLoading(false);
      } catch (error) {
        setError("Something went wrong, please try again later.");
        setLoading(false); 
      }
    }

    getAllQuizzes();
  }, [baseUrl]); 

  if (loading) {
    return <p>Laddar quiz...</p>;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  function handleNavigate(quiz) {
    navigate(`/quiz/${quiz.userId}/${quiz.quizId}`);
  }

  return (
    <article className="allquizes-container">
      <h2 className="allquiz-title">All Quizzes</h2>
      <div className="quizzez-container">
        {quizzes.length > 0 ? (
          quizzes.map((quiz, index) => (
            <div className="quiz-card" key={`${quiz.quizId}- ${index}`}>
              <p>
                <strong>Created by:</strong> {quiz.username}
              </p>
              <p>
                <strong>Quiz Name:</strong> {quiz.quizId}
              </p>
              
              <button id="show-btn" onClick={() => handleNavigate(quiz)}>Show</button>
            </div>
          ))
        ) : (
          <p>No quizzes found</p>
        )}
      </div>
      <button className="goback-button" onClick={() => navigate("/add-quiz")}>
        Go back
      </button>
    </article>
  );
}
