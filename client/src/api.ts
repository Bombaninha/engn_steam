import axios from "axios";

// Singleton pattern with axios
export default axios.create({
    baseURL: `${process.env.REACT_APP_BASE_URL}:${process.env.REACT_APP_BASE_PORT}/${process.env.REACT_APP_BASE_API_VERSION}`
});