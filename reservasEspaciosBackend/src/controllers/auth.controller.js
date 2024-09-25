
import { connectSupabase } from '../database/db.js'
//en proceso


const supabase = connectSupabase()



export const reserve = async (req, res) => {

    console.log("Reserva de desde auth controller")

    const {resourceType} = req.params

    console.log(resourceType)

    try {
        const {data: dataReserve, error: errorReserve} = await supabase
        .from('reservas')
        .insert([
            {
                resourceType
               
            }
        ])

        if (errorReserve) {
            console.log(errorReserve)
            console.log("Error registrando")
            
        }
        
    } catch (error) {
        console.log("Error intentado hacer  la reserva")
        console.log(error)
        
    }

};



export const login = (req, res) => res.send("Login")


export const getResource = async (req, res) => {
    const { resourceType } = req.params;

    console.log("Auth controllers ", resourceType);

    try {

        const { data: dataResource, error: errorResource } = await supabase
            .from('recursos_reservables')
            .select('id')
            .eq('tipo', resourceType);

        if (errorResource) {
            console.log("Error en conseguir los datos");
            return res.status(500).json({ error: "Error al obtener el recurso" });
        }


        return res.status(200).json(dataResource);

    } catch (error) {
        console.error("Error en el servidor: ", error);
        return res.status(500).json({ error: "Error del servidor" });
    }
};

export const getHorary = async (req, res) => {
    const {id,date} = req.params
    console.log("Id : ",id)
    console.log("fecha: ",date)



    try {
        const {data: dataHorary, error: errorHorary} = await supabase
        .from('horarios')
        .select('*')
        .eq('recurso_id',id)
        .eq('fecha',date)


        if (errorHorary) {
            console.log("Error en conseguir lo horarios")
            return res.status(500).json({error: "Error en obtener los horarios"})
            
        }


        console.log("horas ocupadas : ",dataHorary)

        
        
        return res.status(200).json(dataHorary)
        
    } catch (error) {
        console.error("Error en intentar obtener los horarios")
        return res.status(500).json({error: "Error en intentar obtener los horarios"})
        
    }

}