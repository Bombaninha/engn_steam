import axios from "axios";
import { ToastOptions } from "react-toastify";

// Singleton pattern with axios
export default axios.create({
    baseURL: `${process.env.REACT_APP_BASE_URL}:${process.env.REACT_APP_BASE_PORT}/${process.env.REACT_APP_BASE_API_VERSION}`
});

export const isDevMode: boolean = (process.env.REACT_APP_MODE === 'dev');

export const toastConfig: ToastOptions = {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
}