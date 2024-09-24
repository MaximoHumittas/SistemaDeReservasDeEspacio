import axios from 'axios'

const API = 'http://localhost:3000/api'

export const reserveRequest = data => axios.post(`${API}/reserve`,data)

export const resourceRequest = async (typeResource)  => {
    console.log("AUTH ", typeResource)
    axios.get(`${API}/getResource/${typeResource}`) 

} 