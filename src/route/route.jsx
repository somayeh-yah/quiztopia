import { createBrowserRouter } from 'react-router-dom';
import LoginForm from "../views/LoginForm";

import CreateAccounts from '../components/CreateAccount/CreateAccounts';
import AddQuestion from '../views/AddQuestion';
import DisplayAllQuizes from "../views/DisplayAllQuizes";
import CreateQuiz from '../views/CreateQuiz';
const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginForm/>
    
  },
  {
    path: "/create-account",
    element:<CreateAccounts/>
  },
  {
    path:"/add-quiz",
    element:<CreateQuiz/>
  }
  ,
  {
  path: "/add-question/:quizName",
  element: <AddQuestion/>
  }
  ,
  {
    path: "/display-all-Quizes",
    element:<DisplayAllQuizes/>
  }
   
]);

export default router;