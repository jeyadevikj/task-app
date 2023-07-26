import { Box, Grid, Stack, Typography } from "@mui/material"
import { enqueueSnackbar } from "notistack"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Footer from "./Footer"
import Header from "./Header"
import SideBar from "./SideBar"
import TaskCard from "./TaskCard"
import axiosApi from "../api/axiosApi"
import "../styles/Home.css"
const Home = () => {
    const navigate = useNavigate()
    const [tasks, setTasks] = useState([])
    const [user, setUser] = useState()
    const [greetHour, setGreetHour] = useState("Morning")
    useEffect(() => {
        const userObj = JSON.parse(localStorage.getItem('user'))
        if (!userObj) {
            enqueueSnackbar('You have not logged in!', {
                variant: "error",
                preventDuplicate: true
            })
            navigate('/login')
        } else {
            setUser(userObj)
        }

        const fetchTasks = async () => {
            try {
                const response = await axiosApi.get('/tasks')
                console.log(response);
                setTasks(response.data)
            } catch (error) {
                console.log(error);
                enqueueSnackbar(error.response.data.message, {
                    variant: "error",
                    preventDuplicate: true
                })
            }
        }

        const getHour = () => {
            const hour = new Date().getHours()
            if (hour >= 0 && hour < 12) {
                setGreetHour("Morning")
            } else if (hour >= 12 && hour < 18) {
                setGreetHour("Afternoon")
            } else {
                setGreetHour("Evening")
            }
        }
        fetchTasks()
        getHour()
    }, [])

    return (
        <>
            <Header />
            <Box className="content">
                <SideBar />
                <Box component={"main"} className="task-content">
                    <Stack direction="column" spacing={1} alignItems={"flex-start"}>
                        <Typography variant="h5">
                            Good {greetHour}! {user?.name}
                        </Typography>
                        <Typography variant="body1">
                            Have a look at your tasks.
                        </Typography>
                    </Stack>
                    <Box marginTop={2}>
                        <Grid container spacing={2}>
                            {tasks?.map((task, index) => {
                                console.log(task);
                                return (
                                    <Grid item xs={2} md={3} key={index}>
                                        <TaskCard item={task}/>
                                    </Grid>
                                )
                            })}
                        </Grid>

                    </Box>
                </Box>
            </Box>
            <Footer />
        </>
    )
}

export default Home