import axios from "axios"
import { BACKEND_SERVER_URL } from "../Constants/constants"

const axiosInstance = axios.create({baseURL: BACKEND_SERVER_URL});

export default axiosInstance;