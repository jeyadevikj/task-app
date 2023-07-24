import { enqueueSnackbar } from "notistack"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Header from "./Header"
const Home = () => {
    const [user, setUser] = useState()
    const navigate = useNavigate()
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'))
        if(!user) {
            enqueueSnackbar('You have not logged in!', {
                variant: "error"
            })
            navigate('/login')
        }
        setUser(user)
    }, [])

    return (
        <>
            <Header username={user.name}/>
        </>
    )
}

export default Home