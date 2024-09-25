import axios from 'axios'

const API = 'http://localhost:3000/api'


export const reserveRequest = async (data) => { 
    try {
        console.log("Data de reserveRequest: ", data);

        const date = date[0]['date']
        const resourceType = date[0]['resourceType']
        
        console.log("date: ",date,"resourceType ",resourceType )
        
        const response = await axios.post(`${API}/reserve/${resourceType}`);
        return response.data;  // Devuelve la respuesta
    } catch (error) {
        console.error("Error en la solicitud de reserva:", error);
        throw error;  
    }
};

export const resourceRequest = async (typeResource) =>  await axios.get(`${API}/getResource/${typeResource}`);


export const hoursRequest = async (idResources, date) => {
    try {
        console.log("id Resource: ", idResources[0]['id']);
        console.log("date: ", date);

        const id = idResources[0]['id'];

        const response = await axios.get(`${API}/getHorary/${id}/${date}`);
        
        console.log("Response from API:", response);

        return response.data;  

    } catch (error) {
        console.error("Error in hoursRequest:", error);
        return null; 
    }
};
