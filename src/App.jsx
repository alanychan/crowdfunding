import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

// Pages
import HomePage from "./pages/HomePage";
import ProjectPage from "./pages/ProjectPage";

import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";

import SignUpPage from "./pages/SignUpPage";

// Components
import Nav from "./components/Nav/Nav";

//css
import './App.css';

//State
import { useState } from "react";


const HeaderLayout = () => {
  
  const [loggedIn, setLoggedIn] = useState(window.localStorage.getItem("token") != null)
  return (
    <>
      <Nav loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <Outlet context={[loggedIn, setLoggedIn]} />
    </>
  )
};

const router = createBrowserRouter([
  {
    element: <HeaderLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/SignUp", element: <SignUpPage /> },
      { path: "/project/:id", element: <ProjectPage /> },
      { path: "/admin", element: <AdminPage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;