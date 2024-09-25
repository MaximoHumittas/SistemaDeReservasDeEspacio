import axios from 'axios'

const API = 'http://localhost:3000/api'


export const reserveRequest = async (data) => { 
    try {
        console.log("Data de reserveRequest: ", data);

        const date = data['date']
        const resourceId = data['resourceId']
        const hour = data['hour']
        
        
        
        console.log("date: ",date,"resourceType ",resourceId,"hour ", hour)
        
        const response = await axios.post(`${API}/reserve/${resourceId}/${date}/${hour}`);
        return response.data;  // Devuelve la respuesta
    } catch (error) {
        console.error("Error en la solicitud de reserva:", error);
        throw error;  
    }
};

export const resourceRequest = async (typeResource) =>  await axios.get(`${API}/getResource/${typeResource}`);


export const hoursRequest = async (idResources, date) => {
    console.log("hoursRequest ", idResources)
    try {
        console.log("id Resource: ", idResources[0]);
        console.log("date: ", date);

        const id = idResources['id'];

        console.log("id: ",id)

        const response = await axios.get(`${API}/getHorary/${id}/${date}`);
        
        console.log("Response from API:", response);

        return response.data;  

    } catch (error) {
        console.error("Error in hoursRequest:", error);
        return null; 
    }
};
