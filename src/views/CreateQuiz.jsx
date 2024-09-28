import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateQuiz() {
  const navigate = useNavigate();
  const [quizName, setQuizName] = useState("");
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const checkToken = async () => {
      const storedToken = sessionStorage.getItem("token") || "";

      if (storedToken.length > 0) {
        setToken(storedToken);
      }

      if (userId.length > 0) {
        setUserId(userId);
      }

      console.log("token:", storedToken);
    };
    checkToken();
  }, []);

  async function saveQuiz() {
    if (!quizName) {
      console.error("Quiz name is required");
      return;
    }

    if (token) {
      console.log("token", token);
      try {
        const response = await fetch(
          "https://fk7zu3f4gj.execute-api.eu-north-1.amazonaws.com/quiz",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `${token}`,
            },
            body: JSON.stringify({ name: quizName }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log(data, "quizz succsess");
          navigate(`/add-question/${quizName}`);
        } else {
          console.error("failed creat quizz", response.status);
        }
      } catch (error) {
        console.error(error);
      }
    }
  }

  return (
    <>
      <input
        type="text"
        value={quizName}
        onChange={(e) => setQuizName(e.target.value)}
        placeholder="Create a quiz..."
        id="create-quizz-input"
      />
      <button onClick={saveQuiz}>Create Quiz</button>
    </>
  );
}

export default CreateQuiz;
