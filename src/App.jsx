import { RouterProvider } from "react-router-dom";
import router from "./route/route";

export default function App() {
 
  return (
    <main>
       
          <RouterProvider router={router} />
   
    </main>
  );
}


