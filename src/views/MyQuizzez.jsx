// import { useState, useEffect } from "react";
// import "../views/DisplayAllQuizes.css";
// import { useNavigate } from "react-router-dom";
// export default function MyQuizzez() {
//   const [quizzes, setQuizzes] = useState([]);
//   const navigate = useNavigate();
//   useEffect(() => {
//     const savedQuizes = JSON.parse(sessionStorage.getItem("quizzes") || "[]");

//     setQuizzes(savedQuizes);
//   }, []);

//   return (
//     <article className="Allquizes-container">
//       <h2>All Quizzes</h2>
//       {quizzes.map((quiz, index) => (
//         <p className="quiz" key={index}>
//           Fråga: {quiz.question},<br /> Svar: {quiz.answer}, <br />
//           Latitud: {quiz.position[0]},<br /> Longitud: {quiz.position[1]}
//         </p>
//       ))}
//       //{" "}
//       <button onClick={() => navigate("/display-all-Quizes")}>
//         All Quizzez
//       </button>
//       <button onClick={() => navigate("/add-question/:quizName")}>
//         Add More
//       </button>
//     </article>
//   );
// }
