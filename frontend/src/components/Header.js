import { Avatar, Box, Button, Stack, Typography } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import axiosApi from "../api/axiosApi";
import "../styles/Header.css";

const Header = ({ needAuthButtons }) => {
    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem('user'))
    const performLogout = async () => {
        try {
            localStorage.removeItem('user')
            axiosApi.post('/users/logout')
            enqueueSnackbar('You have logged out succesfully!', {
                variant: "success",
                preventDuplicate: true
            })
            navigate('/login')
        } catch (error) {
            enqueueSnackbar(error.response.data.message, {
                variant: "success",
                preventDuplicate: true
            })
        }
    }
    return (
        <>
            <Box className="header">
                <Stack direction={"row"} spacing={1} alignItems={"center"}>
                    <Typography variant={"h4"}>
                        RxTasks
                    </Typography>
                </Stack>
                {needAuthButtons || !user ? (
                    <Stack spacing={2} direction={"row"}>
                        <Button variant="outlined" onClick={() => navigate('/login')}>Login</Button>
                        <Button variant="contained" onClick={() => navigate('/register')}>Register</Button>
                    </Stack>
                ) : (
                    <Stack spacing={2} direction={"row"}>
                        <Stack direction={"row"} alignItems={"center"} spacing={1}>
                            <Avatar alt="Profile image" src="avatar.png" />
                            <Typography variant="body2">{user?.name}</Typography>
                        </Stack>
                        <Button variant="contained" onClick={() => performLogout()}>
                            Logout
                        </Button>
                    </Stack>
                )}
            </Box >
        </>


    )
}

export default Header;