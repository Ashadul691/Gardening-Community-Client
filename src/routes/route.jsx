import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../Layout/RootLayout";
import Home from "../pages/Home";
import ExploreGardeners from "../components/ExploreGardeners";
import BrowseTips from "../components/BrowseTips";
import ShareTip from "../components/ShareTips";
import MyTips from "../components/MyTips";
import Authentication from "../Authentication/Authentication";
import Signin from "../Authentication/Signin";
import SignUp from "../Authentication/SignUp";
import PrivateRoute from "../Provider/PrivateRoute";
import Footer from "../pages/Footer";
import MyProfile from "../components/MyProfile";
import UpdateTip from "../components/UpdateTip";
import TipDetails from "../components/TipDetails"; 

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { 
        index: true, 
        element: <Home /> 
      },
      {
        path: "gardeners",
        element: <ExploreGardeners />,
        loader: async () => {
          const response = await fetch("http://localhost:5000/gardeners");
          return response.json();
        }
      },
      {
        path: "tips",
        element: <BrowseTips />,
        loader: async () => {
          const response = await fetch("http://localhost:5000/tips");
          return response.json();
        }
      },
      
      {
        path: "tips/:id",
        element: <TipDetails />,
        loader: ({ params }) => fetch(`http://localhost:5000/tips/${params.id}`).then(res => res.json())
      },
      {
        path: "share-tip",
        element: (
          <PrivateRoute>
            <ShareTip />
          </PrivateRoute>
        ),
      },
      {
        path: "tips/:id/edit",
        element: <UpdateTip />,
        loader: ({ params }) => fetch(`http://localhost:5000/tips/${params.id}`).then(res => res.json())
      },
      {
        path: "my-tips",
        element: (
          <PrivateRoute>
            <MyTips />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/auth",
    element: <Authentication />,
    children: [
      { path: "signin", element: <Signin /> },
      { path: "signup", element: <SignUp /> },
    ],
  },
  {
    path:"/profile",
    element:<MyProfile/>
  },
  { 
    path: "*", 
    element: <Footer /> 
  },
]);