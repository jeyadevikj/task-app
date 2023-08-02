import { AddCircleOutlined } from "@mui/icons-material"
import { Box, Button, Grid, ListItemButton, ListItemText, Stack, Typography } from "@mui/material"
import { enqueueSnackbar } from "notistack"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axiosApi from "../api/axiosApi"
import "../styles/Home.css"
import theme from "../theme"
import Footer from "./Footer"
import Header from "./Header"
import SideBar from "./SideBar"
import TaskCard from "./TaskCard"
const Home = () => {
    const navigate = useNavigate()
    const [tasks, setTasks] = useState([])
    const [categoryTasks, setCategoryTasks] = useState([])
    const [user, setUser] = useState()
    const [greetHour, setGreetHour] = useState("Morning")
    const [categories, setCategories] = useState([])
    const [filteredTasks, setFilteredTasks] = useState([])
    const [selectedFilter, setSelectedFilter] = useState("All")
    useEffect(() => {
        const fetchUserObj = async () => {
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


        fetchUserObj()
        fetchTasks()
        getHour()
    }, [])

    const fetchTasks = async () => {
        try {
            const response = await axiosApi.get('/tasks')
            console.log(response);
            const currTasks = response.data

            const collections = currTasks.reduce((collections, item) => {
                if (!collections.includes(item.colName)) {
                    collections.push(item.colName)
                }

                return collections
            }, [])
            setTasks(currTasks)
            setCategoryTasks(currTasks)
            setCategories(collections)
            setFilteredTasks(currTasks)
            setSelectedFilter("All")
        } catch (error) {
            console.log(error);
            enqueueSnackbar(error.response.data.message, {
                variant: "error",
                preventDuplicate: true
            })
        }
    }

    const filterByCategory = (category) => {
        console.log(category);
        const filteredTasks = tasks.filter((task) => task.colName === category)
        setCategoryTasks(filteredTasks)
        setFilteredTasks(filteredTasks)
        setSelectedFilter("All")
    }

    const filterByParams = (filterParam, filterParamValue) => {

        const filtered = categoryTasks.filter((task) => task[filterParam] === filterParamValue)
        setFilteredTasks(filtered)
    }

    const handleFilterSelect = (selected, filterCondition) => {
        const filterParam = Object.keys(filterCondition)[0]
        if (!filterParam || selected === "All") {
            setSelectedFilter(selected)
            setFilteredTasks(categoryTasks)
        } else {
            setSelectedFilter(selected)
            filterByParams(filterParam, filterCondition[filterParam])
        }
    }

    return (
        <>
            <Header />
            <Box className="content">
                <SideBar categories={categories} handleCategoryClick={filterByCategory} handleAllTasks={fetchTasks} />
                <Box component={"main"} className="task-content">
                    <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                        <Stack direction="column" spacing={1} alignItems={"flex-start"}>
                            <Typography variant="h5">
                                Good {greetHour}! {user?.name}
                            </Typography>
                            <Typography variant="body1">
                                Have a look at your tasks.
                            </Typography>
                        </Stack>
                        <Button variant="contained" startIcon={<AddCircleOutlined/>} className="btn add-btn">
                            New Task
                        </Button>
                    </Stack>
                    <Grid container spacing={3} padding={2}>
                        <Grid item className="filter-item">
                            <ListItemButton className="btn" onClick={() => handleFilterSelect("All", {})} sx={{ backgroundColor: selectedFilter === "All" ? theme.palette.selected.main : {} }}>
                                <ListItemText>
                                    <Typography variant="body2" color={theme.typography.subtitle2.color}>
                                        All
                                    </Typography>
                                </ListItemText>
                            </ListItemButton>
                        </Grid>
                        <Grid item className="filter-item">
                            <ListItemButton className="btn" onClick={() => handleFilterSelect("Completed", { completed: true })} sx={{ backgroundColor: selectedFilter === "Completed" ? theme.palette.selected.main : {} }}>
                                <ListItemText>
                                    <Typography variant="body2" color={theme.palette.success.main}>
                                        Completed
                                    </Typography>
                                </ListItemText>
                            </ListItemButton>
                        </Grid>
                        <Grid item className="filter-item">
                            <ListItemButton className="btn" onClick={() => handleFilterSelect("Incomplete", { completed: false })} sx={{ backgroundColor: selectedFilter === "Incomplete" ? theme.palette.selected.main : {} }}>
                                <ListItemText>
                                    <Typography variant="body2" color={theme.palette.warning.main}>
                                        Incomplete
                                    </Typography>
                                </ListItemText>
                            </ListItemButton>
                        </Grid>
                        <Grid item className="filter-item">
                            <ListItemButton className="btn" onClick={() => handleFilterSelect("HighPriority", { hasPriority: true })} sx={{ backgroundColor: selectedFilter === "HighPriority" ? theme.palette.selected.main : {} }}>
                                <ListItemText>
                                    <Typography variant="body2" color={theme.palette.priority.main}>
                                        High Priority
                                    </Typography>
                                </ListItemText>
                            </ListItemButton>
                        </Grid>
                        <Grid item className="filter-item">
                            <ListItemButton className="btn" onClick={() => handleFilterSelect("LowPriority", { hasPriority: false })} sx={{ backgroundColor: selectedFilter === "LowPriority" ? theme.palette.selected.main : {} }}>
                                <ListItemText>
                                    <Typography variant="body2" color={theme.palette.success.main}>
                                        Low Priority
                                    </Typography>
                                </ListItemText>
                            </ListItemButton>
                        </Grid>
                    </Grid>
                    <Grid container spacing={3} padding={2}>
                        {filteredTasks?.map((task, index) => {
                            console.log(task);
                            return (
                                <Grid item key={index}>
                                    <TaskCard item={task} />
                                </Grid>
                            )
                        })}
                    </Grid>

                </Box>
            </Box>
            <Footer />
        </>
    )
}

export default Home