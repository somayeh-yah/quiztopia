import { RouterProvider } from "react-router-dom";
import router from "./route/route";

export default function App() {
 
  return (
    <main>
       <h1>Come and play Quiz with us</h1>
          <RouterProvider router={router} />
   
    </main>
  );
}


