import axios from "axios"
import config from "../config"

const axiosApi = axios.create({
    baseURL: config.endpoint,
    withCredentials: true
})

export default axiosApi