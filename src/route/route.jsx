// import { createBrowserRouter } from "react-router-dom";
// import LoginForm from "../views/LoginForm";
// // import MyQuizzez from "../views/MyQuizzez";
// import CreateAccounts from "../components/CreateAccount/CreateAccounts";
// import AddQuestion from "../views/AddQuestion";
// import DisplayAllQuizes from "../views/DisplayAllQuizes";
// import CreateQuiz from "../views/CreateQuiz";
// import DisplayQuestion from "../views/DisplayQuestion";
// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <LoginForm />
//   },
//   {
//     path: "/create-account",
//     element: <CreateAccounts />
//   },
//   {
//     path: "/add-quiz",
//     element: <CreateQuiz />
//   },
//   {
//     path: "/add-question/:quizName",
//     element: <AddQuestion />
//   },

//   {
//     path: "/display-all-Quizes",
//     element: <DisplayAllQuizes />
//   },
//   {
//     path: "/display-question",
//     element: <DisplayQuestion/>
//   }
// ]);

// export default router;

import { createBrowserRouter } from "react-router-dom";
import LoginForm from "../views/LoginForm";
import DisplayAllQuizzes from "../views/DisplayAllQuizes";
// import QuizLocationPage from "../views/QuizzLocationPage";
import DisplayQuestion from "../views/DisplayQuestion";
import CreateAccounts from "../components/CreateAccount/CreateAccounts";
import CreateQuiz from "../views/CreateQuiz";
import AddQuestion from "../views/AddQuestion";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginForm />,
  },
  {
    path: "/create-account",
    element: <CreateAccounts />,
  },
  {
    path: "/add-quiz",
    element: <CreateQuiz />,
  },
  {
    path: "/add-question/:quizName",
    element: <AddQuestion />,
  },
  {
    path: "/display-all-Quizes",
    element: <DisplayAllQuizzes />,
  },
  {
    path: "/quiz/:userId/:quizId",
    element: <DisplayQuestion />,
  },
]);

export default router;
