import axios from "axios";
console.log("he",import.meta.env.Vite_BACK_URL)

export default axios.create({
    baseURL : import.meta.env.VITE_BACK_URL
})