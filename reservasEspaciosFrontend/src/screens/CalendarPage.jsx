import { Calendar, dayjsLocalizer } from 'react-big-calendar'; 
import 'react-big-calendar/lib/css/react-big-calendar.css'; 
import dayjs from 'dayjs';
import { useState,useContext } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { UserContext } from '../userContext';
import { bool } from 'prop-types';




function CalendarPage() {

    const { user } = useContext(UserContext);
    const [error, setError] = useState('');
    
    const [formData, setFormData] = useState({
        user_id: '12.545.872-5',
        user: 'max',
        tipoUsuario: 'estudiante',
        tipoAgendamiento: '', 
        fecha: '',
        franja_horaria: '',
        agendado: bool
    
    })


    const [selectedDate,setSelectedDate] = useState(null)
    const [startTime,setStartTime] = useState('')
    const [endTime,setEndTime] = useState('')


    function formFranjaHoraria(inicio,termino) {
        
        console.log("dentro de funcionj")
        console.log(inicio,termino)

        return inicio+'-'+termino


    }

    const RegisterData = async (e) => {
        e.preventDefault();


        formData.franja_horaria = formFranjaHoraria(startTime,endTime)
        formData.agendado = true
        formData.fecha = dayjs(formData.fecha).format("YYYY-M-D")


        console.log(formData)


        try {

            const response = await fetch('http://localhost:3000/agendamiento', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id: formData.user_id,
                    user: formData.user,
                    tipo_agendamiento: formData.tipoAgendamiento,
                    fecha: formData.fecha,
                    franja_horaria: formData.franja_horaria,
                    agendado: formData.agendado
                              
                }),
            })



            const contentType = response.headers.get('content-type');
            console.log(contentType)
            const result = await response.json()
            console.log("Respuesta de backend ", result)

            if (response.ok) {
                console.log("Agendamiento de fecha correcto")
            } else {
                console.error("Erroe en el agendamiento")
            }


            
        } catch (error) {
            console.log("Error en intentar",error)

            
        }

        
    }




    return (
        <div>
            <h1>Pruebas crear agendamientos </h1>


            <h2>Agendamiento desde el usuario o profesor</h2>

            <p>Este formulario va a meter los datos en la tabla de 'agendamiento y 'horarios'' </p>
            <form onSubmit={RegisterData}>

                <div>
                    <label>tipo de agendamiento</label>
                    <select

                        name="tipo_agendamiento"
                        id="tipo_agendamiento"
                        value={formData.tipoAgendamiento}
                        
                        onChange={(e) => setFormData({ ...formData, tipoAgendamiento: e.target.value })}

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
                        }}


                        dateFormat="dd/MM/yyyy"
                        placeholderText='Seleccionar un'
                    />
                </div>



                <div>
                    <label htmlFor="start-time">Hora de inicio</label>
                    <input
                        type="time"
                        id="start-time"

                        onChange={(e) => setStartTime(e.target.value)}    
                        
                    />
                <div>

                    
                </div>
                    <label>Hora de termino</label>
                    <input
                        type="time"
                        id='end-time'
                        onChange={(e) => setEndTime(e.target.value)}
                        
                    />
                </div>



                <button type='submit'>Agendar Fecha</button>
            </form>    



            <h2>Agendamiento de los recursos reservables</h2>  






        </div>
    );
}

export default CalendarPage;