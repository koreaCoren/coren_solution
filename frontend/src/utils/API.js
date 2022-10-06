import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost",
    headers: {
        "Content-Type" : "application/json",
    },
    withCredentials: true,
})

export default API;