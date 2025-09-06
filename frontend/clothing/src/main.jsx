import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { PrimeReactProvider } from 'primereact/api';


import 'primereact/resources/themes/lara-light-teal/theme.css'
import 'primereact/resources/primereact.min.css';
//import 'primeicons/primeicons.css';
import './index.css'

import ProtectedRoutes from './Components/ProtectedRoute';
import MainMenu from './Components/MainMenu';
import MyAccount from './Components/MyAccount';
import MyProduct from './Components/MyProduct'
import BuyProduct from './Components/BuyProduct';
import SearchBar from './Components/SearchBar';
import AboutUs from './Components/AboutUs';
import Login from './Components/Login';
import Basket from './Components/Basket';
import NotFound from "./Components/NotFound"


const router = createBrowserRouter([
  {
    path:"/",
    element:<MainMenu/>
  },
  {
    path:"/myaccount",
    element:<ProtectedRoutes><MyAccount/></ProtectedRoutes>
  },
  {
    path:"/myproduct",
    element:<ProtectedRoutes><MyProduct/></ProtectedRoutes>
  },
  {
    path:"/myproduct/:idproduct",
    element:<MyProduct/>
  },
  /*
  {
    path:"/buyproduct/:idproduct?=update",
    element:<BuyProduct/>
  },
  */
  {
    path:"/buyproduct/:idproduct",
    element:<BuyProduct/>
  },
  {
    path:"/searchbar",
    element:<SearchBar/>
  },
  {
    path:"/searchbar/:subcategory",
    element:<SearchBar/>
  },
  {
    path:"/login",
    element:<Login/>
  },
  {
    path:"/aboutus",
    element:<AboutUs/>
  },
  {
    path:"/basket",
    element:<Basket/>
  },
  {
    path: "*",
    element: <NotFound />
  },
])

createRoot(document.getElementById('root')).render(

    <PrimeReactProvider value={{ ripple: true }}>
      <RouterProvider router={router} />
    </PrimeReactProvider>

)
