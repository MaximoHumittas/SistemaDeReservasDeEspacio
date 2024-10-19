import axios from 'axios'
import { any } from 'prop-types';


const API = 'http://localhost:3000/auth'


export const reserveRequest = async (data) => { 
    try {
        console.log("Data de reserveRequest: ", data);
        const idUser = data['idUser']
        const date = data['date']
        const resourceId = data['resourceId']
        const hour = data['hour']
        
        
        
        console.log("date: ",date,"resourceType ",resourceId,"hour ", hour)


        
        const response = await axios.post(`${API}/reserve/${idUser}/${resourceId}/${date}/${hour}`);
        return response.data;  // Devuelve la respuesta
    } catch (error) {
        console.error("Error en la solicitud de reserva:", error);
        throw error;  
    }
};

export const resourceRequest = async (typeResource) => {

    

    try {

        const response = await axios.get(`${API}/getResource/${typeResource}`);
        console.log("Respuesta de obtener dato ", response.data)
        return response.data
        
    } catch (error) {

        console.error("Error en obtener el dato", error)
        
    }


}


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

export const getUserId = async (email) => {

    console.log("Email ", email )

    try {
        const response = await axios.get(`${API}/getId/${email}`)

        return response.data
        
    } catch (error) {

        console.error("Error en registrar la hora ")
        return null
        
    }
}


//nunca se ocupo
export const register = async (data) => {

    console.log("Data de register Api: ", data )

}