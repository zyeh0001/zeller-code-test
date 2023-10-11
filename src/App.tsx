import "./App.css";
import { Amplify } from "aws-amplify";
import awsconfig from "./aws-exports"; // Ensure correct path
import Home from "./pages/Home";
import PageNotFound from "./pages/PageNotFound";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

Amplify.configure(awsconfig);

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<PageNotFound />} />
      </>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
