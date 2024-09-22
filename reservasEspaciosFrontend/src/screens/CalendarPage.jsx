import { Calendar, dayjsLocalizer } from 'react-big-calendar'; 
import 'react-big-calendar/lib/css/react-big-calendar.css'; 
import dayjs from 'dayjs';
import { useState,useContext } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { UserContext } from '../userContext';
import { bool } from 'prop-types';
import AvailableHourSelector from '../components/AvailableHourSelector';



function CalendarPage() {

    
    const [formData, setFormData] = useState({
        user_id: 98,
        tipoAgendamiento: '', 
        fecha: '',
        hora_inicio: '',
        hora_fin: '',
        recurso_id: 56
    })

    const [selectedDate,setSelectedDate] = useState(null)
    const [startTime,setStartTime] = useState('')
    const [endTime,setEndTime] = useState('')

    const [idResources,setIdResources] = useState('')
    const [availableHours, setAvailableHours] = useState([])

    const RegisterData = async (e) => {
        e.preventDefault();

        formData.fecha = dayjs(formData.fecha).format("YYYY-M-D")
        formData.hora_inicio = startTime
        formData.hora_fin = endTime

        console.log("Datos enviados al backend para la reserva",formData)

        try {

            const response = await fetch('http://localhost:3000/reserva', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    usuario_id: formData.user_id,
                    hora_inicio: formData.hora_inicio,
                    hora_fin: formData.hora_fin,
                    recurso_id: formData.recurso_id,
                    fecha: formData.fecha

                }),
            })

            const result = await response.json()
            console.log("Respuesta de backend ", result)

            if (response.ok) {
                console.log("Registro de fecha correcto")
            } else {
                console.error("Error en la reserva")
            }


            
        } catch (error) {
            console.log("Error en intentar reservar ",error)

            
        }

        
    }

    const GetAvailableResource = async (type) => {

        console.log(type)

        try {
            const response = await fetch(`http://localhost:3000/obtenerRecurso?type=${type}`)
            
            if (!response.ok) {
                console.log("Error en la solicitud")
            }

            const result = await response.json()
            console.log("Recurso obtenido ",result)
            setIdResources(result)


            
        } catch (error) {
            console.log("Error en obtener los recursos: ", error)
            
        }
    }


    const GetAvailableHours = async (date) => {

        console.log(idResources)


        date = dayjs(date).format("YYYY-MM-D")

        console.log('datos enviandos al backend, ', date)
        const newAvailableHours = []

        console.log("Imprimiendo cada recurso por separado")
        for (let index = 0; index < idResources.length; index++) {
            let idResource = idResources[index];

            const resourceId = idResource.id
            console.log("Id: ",{resourceId})

            try {
                const response = await fetch(`http://localhost:3000/ObtenterHorario?idResource=${resourceId}&date=${date}`)
                
                if (!response.ok) {

                    console.log("Error en obtener los recursos ")
                    continue
                    
                }
    
                const result = await response.json()
                console.log(`Horas obtenidas segun el tipo de recurso id ${id}, horas: ${result}`)


                if (result.length > 0) {
                    newAvailableHours.push(...result)
                }
    
            } catch(error) {
                console.log("Error en tener las horas disponibles")
            }
        }

        if (availableHours.length === 0) {
            for (let hour = 8; hour < 19; hour++) {

                const horaInicio = `${hour}:00`
                const horaFinal = `${hour+1}:00`

                newAvailableHours.push({hora_inicio: horaInicio, hora_fin: horaFinal})
                
                
            }
        }

        setAvailableHours(newAvailableHours)
    }




    const [formResource, setFormResource] = useState({
        tipo: '',
        nombre: ''

    })

    const handleInputChange = (e) => {
        setFormResource({
            ...formResource,
            [e.target.name]: e.target.value
        })
    }

    const registerResources = async (e) => {
        e.preventDefault()

        console.log(formResource)

        try {
            const response = await fetch('http://localhost:3000/recurso', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    tipo: formResource.tipo,
                    nombre: formResource.nombre
                })
            })

            const result = await response.json()

            console.log("Respuesta de backend",result)

            if (response.ok) {
                console.log("Registro de recurso insertado correctamente")
                
            } else {
                console.log('Error en registrar el recurso')
            }
            
        } catch (error) {
            console.log("Error en intentar inserta recursos")
            
        }



    }






    return (
        <div>
            <h1>Pruebas crear agendamientos </h1>


            <h2>Registro de reserva </h2>

            <form onSubmit={RegisterData}>

                <div>
                    <label>tipo de agendamiento</label>
                    <select

                        name="tipo_agendamiento"
                        id="tipo_agendamiento"
                        value={formData.tipoAgendamiento}
                        
                        onChange={ (e) => {
                            const value = e.target.value
                            setFormData({ ...formData, tipoAgendamiento: value }),
                            GetAvailableResource(value)
                        
                        }}

                    >
                        <option value="">Seleccionar...</option>
                        <option value="CUBICULO">Cubículo</option>
                        <option value="GIMNASIO">Gimnasio</option>
                    </select>
                </div>


                <div>
                    <label htmlFor="">Seleccionar Dia</label>
                    <DatePicker
                        selected={selectedDate}
                        onChange={(date) => {
                            setSelectedDate(date);
                            setFormData({...formData, fecha: date})
                            GetAvailableHours(date)
                        }}


                        dateFormat="dd/MM/yyyy"
                        placeholderText='Seleccionar un'
                    />
                </div>

                <div>
                    {
                        availableHours.map((hour, index) => (

                            <AvailableHourSelector key={index} horaInicio={hour.hora_inicio} HoraFinal={hour.hora_fin}/>

                        ))
                    }
                    
                </div>





                <button type='submit'>Agendar Fecha</button>
            </form>    



            <h2>Registrar de los recursos reservables</h2>  

            <form onSubmit={registerResources}>

                <div>
                    <label>Tipo de recurso</label>
                    <select 
                        name="tipo_recurso" 
                        id="tipo_recurso"
                        value={formResource.tipo}
                        onChange={(e)=>setFormResource({...formResource, tipo: e.target.value})}
                    >
                        <option value="">Seleccionar...</option>
                        <option value="CUBICULO">Cubículo</option>
                        <option value="GIMNASIO">Gimnasio</option>
                    </select>

                </div>

                <div>
                    <label htmlFor="text">Nombre del recurso</label>
                    <input type="text" name='nombre' value={formResource.nombre} onChange={handleInputChange}/>
                </div>


                <button type='submit' >Registrar Recurso</button>

                

            </form>










        </div>
    );
}

export default CalendarPage;