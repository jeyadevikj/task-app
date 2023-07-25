import { Box } from "@mui/material"
import { enqueueSnackbar } from "notistack"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Footer from "./Footer"
import Header from "./Header"
import SideBar from "./SideBar"
const Home = () => {
    const navigate = useNavigate()
    useEffect(() => {
        const userObj = JSON.parse(localStorage.getItem('user'))
        if (!userObj) {
            enqueueSnackbar('You have not logged in!', {
                variant: "error",
                preventDuplicate: true
            })
            navigate('/login')
        }
    }, [])

    return (
        <>
            <Header />
            <Box className="content">
                <SideBar/>
                
            </Box>
            <Footer />
        </>
    )
}

export default Home