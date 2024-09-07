import { useState, useEffect } from "react";
import "../views/DisplayAllQuizes.css";
import { useNavigate, useParams } from "react-router-dom";
export default function DisplayAllQuizzes() {
  const [quizzes, setQuizzes] = useState([]);
  const navigate = useNavigate();
  // const quizName = useParams();
  const baseUrl = "https://fk7zu3f4gj.execute-api.eu-north-1.amazonaws.com";

  async function getAllQuizez() {
    try {
      const response = await fetch(`${baseUrl}/quiz`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log("alla guiz", data);
      setQuizzes(data.quizzes);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getAllQuizez();
  }, []);

  return (
    <article className="allquizes-container">
      <h2 className="allquiz-title">All Quizzez</h2>
      <div className="quizzez-container">
        {quizzes.length > 0 ? (
          quizzes.map((quiz, index) => (
            <div className="quiz-card" key={index}>
              <p>
                <strong>Av:</strong> {quiz.username}
              </p>
              <p>
                <strong>Quiz ID:</strong> {quiz.quizId}
              </p>
              <p>
                <strong>User ID:</strong> {quiz.userId}
              </p>
            </div>
          ))
        ) : (
          <p>Inga guizz hittades</p>
        )}
      </div>
      <button className="goback-button" href="" onClick={() => navigate("/")}>
        Go back
      </button>
    </article>
  );
}
