import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { Outlet } from 'react-router';
import { createContext, Dispatch, useReducer, useState } from 'react';
import Avatar from './Avatar';
import Navbar from './Navbar';
import UpdateDetails from './RecipeDetails';
import Login from './login';
import { action, actionUser } from '../types/userActionType';
import { UserType } from '../types/userType';
import AddRecipe from './AddRecipe';

export const UsrReducer = createContext<{ user: UserType, userDispatch: Dispatch<action> }>(
    {
        user: {},
        userDispatch: () => null
    })

export const IsLogin = createContext<[boolean, Dispatch<React.SetStateAction<boolean>>]>([false, () => null])

const Header = () => {

    const [user, userDispatch] = useReducer(actionUser, {
        id:0,
        firstName:'',
        lastName:'',
        email:'',
        password:'',
        address:'',
        phon:''
    })
    const [isLogin, setIsLogin] = useState(false)
    
    return (
        <IsLogin  value={[isLogin, setIsLogin]}>
            <UsrReducer  value={{ user, userDispatch }} >
                <Box sx={{ flexGrow: 1 }}>
                    <AppBar position="static">
                        <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Box>
                                {!isLogin && <Login />}
                                {/* <div style={{ display: 'flex', justifyContent: 'space-between' }}> */}
                                    {isLogin && <Avatar />}
                                    {isLogin && <UpdateDetails />}
                                    {isLogin && <AddRecipe />}
                                {/* </div> */}
                            </Box>

                            <Box>
                                <Navbar />
                            </Box>
                        </Toolbar>
                    </AppBar>
                  
                    <Outlet />
                    
                </Box>
            </UsrReducer >
        </IsLogin >
    );
}

export default Header