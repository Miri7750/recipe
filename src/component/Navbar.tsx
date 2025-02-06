import { Button, Typography } from "@mui/material"
import { useContext, useState } from "react";
import { Link } from "react-router";
import AddRecipe from "./AddRecipe";
import { UsrReducer } from "./Header";

const Navbar = () => {
    const buttonStyle: React.CSSProperties = {
        display: 'inline-block',
        padding: '10px 20px',
        backgroundColor: 'transparent',
        color: 'white',
        textAlign: 'center',
        textDecoration: 'none',
        borderRadius: '5px',
        border: 'none',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    };

    const hoverStyle: React.CSSProperties = {
        backgroundColor: '#0056b3',
    }
    const user = useContext(UsrReducer)
    
    const [isHoveredHome, setIsHoveredHome] = useState(false);
    const [isHoveredAbout, setIsHoveredAbout] = useState(false);
    const [isHoveredRecipes, setIsHoveredRecipes] = useState(false);
    const [isHoveredAddRecipes, setIsHoveredAddRecipes] = useState(false);

    return (
        <nav>
            <Typography variant="h6" component="div" sx={{ flexGrow: 0.5 }}>
                <Link style={{ ...buttonStyle, ...(isHoveredHome ? hoverStyle : {}) }}
                    onMouseEnter={() => setIsHoveredHome(true)}
                    onMouseLeave={() => setIsHoveredHome(false)} 
                    to='/'>Home</Link>
            </Typography>
            <Typography variant="h6" component="div" sx={{ flexGrow: 0 }}>
                <Link style={{ ...buttonStyle, ...(isHoveredAbout ? hoverStyle : {}) }}
                    onMouseEnter={() => setIsHoveredAbout(true)}
                    onMouseLeave={() => setIsHoveredAbout(false)} 
                    to='/about'>About</Link>
            </Typography>
            <Typography variant="h6" component="div" sx={{ flexGrow: 0 }}>
                <Link style={{ ...buttonStyle, ...(isHoveredRecipes ? hoverStyle : {}) }}
                    onMouseEnter={() => setIsHoveredRecipes(true)} 
                    onMouseLeave={() => setIsHoveredRecipes(false)} 
                    to='/recipes'>Recipes</Link> 
            </Typography>
            {user.user.id!=0 &&
            <Typography variant="h6" component="div" sx={{ flexGrow: 0 }}>
                <Button style={{ ...buttonStyle, ...(isHoveredAddRecipes ? hoverStyle : {}) }}
                    onMouseEnter={() => setIsHoveredAddRecipes(true)} 
                    onMouseLeave={() => setIsHoveredAddRecipes(false)} 
                    ><AddRecipe/>
    </Button>
            </Typography>}
        </nav>
    );
}

export default Navbar;



