import { Button, Stack, TextField, Typography } from "@mui/material"
import "../styles/Register.css"
import Header from "./Header"
import Footer from "./Footer"
import { KeyboardArrowRightSharp } from "@mui/icons-material"
import { enqueueSnackbar } from "notistack"
import axiosApi from "../api/axiosApi"
import { useNavigate } from "react-router-dom"

const Register = () => {
    const navigate = useNavigate()

    const registerUser = async (name, email, password) => {
        try {
            const response = await axiosApi.post('/users/register', {
                name, 
                email,
                password
            })
            console.log(response);
            localStorage.setItem('user', JSON.stringify(response.data.user))
            enqueueSnackbar('Successfully registered! You are being redirected to the home page', {
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
        const name = event.target.username.value
        const email = event.target.email.value
        const password = event.target.password.value
        await registerUser(name, email, password)
    }

    return (
        <>
            <Header needAuthButtons/>
            <form onSubmit={(event) => handleSubmit(event)} className="form" method="post">
                <Stack spacing={2} className="form-content">
                    <Typography variant={"subtitle1"}>
                        Create your account
                    </Typography>
                    <TextField type="text" variant="outlined" label="Display Name" name="username"/>
                    <TextField type="email" variant="outlined" label="Email" name="email" />
                    <TextField type="password" variant="outlined" label="Password" name="password" />
                    <Button type="submit" variant="contained" fullWidth={true} sx={{ textTransform: "none" }} endIcon={<KeyboardArrowRightSharp />}>
                        Register me
                    </Button>
                </Stack>
            </form>
            <Footer />
        </>
    )
}

export default Register