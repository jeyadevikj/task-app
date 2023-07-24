import { KeyboardArrowRightSharp } from "@mui/icons-material"
import { Button, Stack, TextField, Typography } from "@mui/material"
import { enqueueSnackbar } from "notistack"
import { useNavigate } from "react-router-dom"
import axiosApi from "../api/axiosApi"
import "../styles/Login.css"
import Footer from "./Footer"
import Header from "./Header"



const Login = () => {
    const navigate = useNavigate()
    const verifyLogin = async (email, password) => {
        try {
            const response = await axiosApi.post('/users/login', {
                email,
                password
            })
            console.log(response);
            localStorage.setItem('user', JSON.stringify(response.data.user))
            enqueueSnackbar('You have been logged in successfully', { 
                preventDuplicate: true, 
                variant: "success" 
            })
            navigate('/')
        } catch (error) {
            console.log(error);
            enqueueSnackbar(error.response.data.message, {
                preventDuplicate: true,
                variant: "error"
            })
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const email = event.target.email.value
        const password = event.target.password.value
        await verifyLogin(email, password)
    }

    return (
        <>
            <Header needAuthButtons/>
            <form onSubmit={(event) => handleSubmit(event)} className="form" method="post">
                <Stack spacing={2} className="form-content">
                    <Typography variant={"subtitle1"}>
                        Type in your credentials
                    </Typography>
                    <TextField type="email" variant="outlined" label="Email" name="email" />
                    <TextField type="password" variant="outlined" label="Password" name="password" />
                    <Button type="submit" variant="contained" fullWidth={true} sx={{ textTransform: "none" }} endIcon={<KeyboardArrowRightSharp />}>
                        Login to RxTasks
                    </Button>
                </Stack>
            </form>
            <Footer />
        </>
    )
}

export default Login