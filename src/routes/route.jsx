import { createBrowserRouter } from "react-router-dom";
import Authentication from "../Authentication/Authentication";
import Signin from "../Authentication/Signin";
import SignUp from "../Authentication/SignUp";
import BrowseTips from "../components/BrowseTips";
import ExploreGardeners from "../components/ExploreGardeners";
import MyProfile from "../components/MyProfile";
import MyTips from "../components/MyTips";
import ShareTip from "../components/ShareTips";
import TipDetails from "../components/TipDetails";
import UpdateTip from "../components/UpdateTip";
import RootLayout from "../Layout/RootLayout";
import Footer from "../pages/Footer";
import Home from "../pages/Home";
import PrivateRoute from "../Provider/PrivateRoute";

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
          const response = await fetch("https://gardening-community-server-five.vercel.app/gardeners");
          return response.json();
        }
      },
      {
        path: "tips",
        element: <BrowseTips />,
        loader: async () => {
          const response = await fetch("https://gardening-community-server-five.vercel.app/tips");
          return response.json();
        }
      },
      
      {
        path: "tips/:id",
        element: <TipDetails />,
        loader: ({ params }) => fetch(`https://gardening-community-server-five.vercel.app/tips/${params.id}`).then(res => res.json())
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
        loader: ({ params }) => fetch(`https://gardening-community-server-five.vercel.app/tips/${params.id}`).then(res => res.json())
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