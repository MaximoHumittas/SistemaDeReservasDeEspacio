
import { connectSupabase } from '../database/db.js'
//en proceso
export const reserve = async (req,res) => {
    const {resourceType,hour,date} = req.body


    console.log(resourceType,hour,date)



    try {
        const supabase = connectSupabase()

        const {data: dataReserve, error: errorReserve} = await supabase.from('reservas').insert([
            {
                resourceType,
                hour,
                date
            }

        ])

        if (errorReserve) {
            console.log('Error en reservar: ', errorReserve)
        }
        
        console.log('Reserva con exito', dataReserve)
        return res.status(200).json({ message: "Reserva con exito", data: dataReserve })

        
    } catch (error) {

        console.error("Error en el proceso de reserva:", error);
        return res.status(500).json({ error: "Error en el proceso de reserva" });
    
    }
}


export const login = (req, res) => res.send("Login")


export const getResource = (req,res) => {
    const { resourceType } = req.params

    console.log("Tipo de recurso", resourceType) 

    res.json({ message: `Tipo de recurso ${resourceType}` })

}