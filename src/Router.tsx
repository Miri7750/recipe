import { createBrowserRouter } from "react-router"
import About from "./component/Abute"
// import Navbar from "./component/Navbar"
import Home from "./component/Home"
import Header from "./component/Header"
import RecipesList from "./component/RecipesList"
import RecipeDetails from "./component/RecipeDetailes"

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Header/>,
        errorElement: <h1>error</h1>,
        children: [
            { path: '/', element: <Home/> },
            { path: 'about', element: <About/> },
            { path: 'recipes', element: <RecipesList />,children: [
                { path: ':id', element: <RecipeDetails/> } 
            ]} 

        ]
    }
])





