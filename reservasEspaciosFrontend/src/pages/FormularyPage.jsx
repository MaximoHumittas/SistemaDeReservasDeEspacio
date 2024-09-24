
import 'react-big-calendar/lib/css/react-big-calendar.css'; 
import dayjs from 'dayjs';
import { createContext, useEffect, useState } from 'react';
import { Calendar, dayjsLocalizer } from 'react-big-calendar'; 
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

//nuevo

import { useForm } from 'react-hook-form';
import React from 'react';
import { reserveRequest, resourceRequest } from '../api/auth';
import {useParams} from 'react-router-dom'

export default function Formulary(){

    {/* 
    
    const [formData, setFormData] = useState({
        user_id: 0,
        tipoAgendamiento: '', 
        fecha: '',
        hora_inicio: '',
        hora_fin: '',
        recurso_id: ''
    })

    const [selectedDate,setSelectedDate] = useState(null)
    const [startTime,setStartTime] = useState('')
    const [endTime,setEndTime] = useState('')
    const [idResources,setIdResources] = useState('')


    const [availableHours, setAvailableHours] = useState([])
    const [busyHours, setBusyHours] = useState([])

    //numeros random para el usuario

    formData.user_id = 666


    const RegisterData = async (e) => {
        e.preventDefault();

        formData.fecha = dayjs(formData.fecha).format("YYYY-M-D")
        formData.hora_inicio = startTime
        formData.hora_fin = endTime
        formData.recurso_id = idResources

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
        const AuxbusyHours = []
        let horasEncontradas = false

        console.log("Imprimiendo cada recurso por separado")
        for (let index = 0; index < idResources.length && !horasEncontradas; index++) {
            console.log("Flag para para el for ", horasEncontradas) 

            let idResource = idResources[index];

            const recurso_id = idResource.id
            console.log("Id: ",{recurso_id})

            try {
                const response = await fetch(`http://localhost:3000/ObtenerHorario?recurso_id=${recurso_id}&date=${date}`);
                
                if (!response.ok) {
                    console.log("Error en obtener los recursos ", response.statusText)
                    continue                    
                }

                const result = await response.json()
                console.log(`Horas obtenidas segun el tipo de recurso id ${recurso_id}`, result);

                
                if (Array.isArray(result) && result.length > 0) {

                    result.forEach((horario, index) => {
                    console.log("index: ", index);
                    console.log("Hora inicio: ", horario.hora_inicio);
                    console.log("Hora final: ", horario.hora_fin);

                    AuxbusyHours.push(`${horario.hora_inicio} - ${horario.hora_fin}`);

                    

                    if (AuxbusyHours.length <= 12) {
                        console.log("El horario esta desocupado")
                        horasEncontradas = true
                        
                    } else {
                        console.log("El horario esta ocupado completamente")
                    }

                    
                    
                });

                } else {
                    console.log("No se encontraron horas disponibles para el recurso.");
                }




            } catch(error) {
                console.error("Error en tener las horas disponibles: ", error);
            }

            setIdResources(recurso_id)

            console.log("ultima id", recurso_id)
        }


        console.log(AuxbusyHours.length)

        

        for (let index = 0; index < AuxbusyHours.length; index++) {
            let horaInicio =(AuxbusyHours[index].split(' - ')[0]).slice(0, 5)
            let horaFinal = (AuxbusyHours[index].split(' - ')[1]).slice(0, 5)

            console.log(horaInicio,horaFinal)
            AuxbusyHours[index] = `${horaInicio} - ${horaFinal}`

        }
        
        const hoursFormattet = AuxbusyHours.map(h => {
            let [horaInicio, horaFinal] = h.split(' - ').map(h => h.slice(0, 5));
            return `${horaInicio} - ${horaFinal}`;
        });
        
    
        const Allhours = [];
        for (let hour = 8; hour < 19; hour++) {
            Allhours.push(`${hour}:00 - ${hour + 1}:00`);
        }

        const availableHours = Allhours.filter(hour => !hoursFormattet.includes(hour));

        console.log("Hora ocupadas", AuxbusyHours);
        console.log("Horas disponibles", availableHours);
        setAvailableHours(availableHours)  


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

    */}

    const params = useParams()

    const { register, handleSubmit, setValue } = useForm();
    const [startDate, setStartDate] = useState(null);



    const handleDateChange = (date) => {
        setStartDate(date);
        setValue("date", date)
    };

    const GetResourcesByType = async (event) => {
        console.log(event.target.value)
        const resourceType = event.target.value
        console.log(resourceType)

        if (resourceType) {
            try {
                const res = await resourceRequest(event.target.value)
                console.log(res)
                
            } catch (error) {
                console.log("Error en obtner el dato",error)
                
            }
            
        }
       
        
        
    }


    return (
        


        <div>


            <h1>Formulario</h1>

            <form onSubmit={handleSubmit(async(values) => {
                console.log(values)

                const res = await reserveRequest(values)
                console.log(res)

            })}>
                <div>
                    <label>Tipo de recurso</label>
                    <select 
                    {...register("resourceType", { required: "Selecciona un tipo de recurso" })}
                    onChange={GetResourcesByType}
                
                >
                        <option value="">Seleccionar...</option>
                        <option value="CUBICULO">Cubiculo</option>
                        <option value="GIMNASIO">gimnasio</option>
                    </select>

                <div>
                    <label >Seleccionar Dia</label>
                    <DatePicker
                    selected={startDate}
                    onChange={handleDateChange}
                    dateFormat="yyyy/MM/dd" // Formato de la fecha
                    placeholderText="Seleccionar fecha"
                    required 
                    />

                </div>


                </div>
                    <label>Elige la hora</label>
                    <select {...register("hour", { required: "Selecciona una hora" })}>
                        <option value="">Seleccionar...</option>
                        <option value="11:00">11:00</option>
                        <option value="12:00">12:00</option>
                    </select>


                <button type="submit">Enviar</button>
            </form>


            {/*

            


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
                        <option value="">Seleccionar ...</option>
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
                    <label>Seleccionar Horario</label>
                    <select 
                        name="horario" 
                        id="horario" 
                        value={formData.hora_inicio}
                        onChange={(e) => {
                            const selectedHour = e.target.value;
                            console.log(selectedHour)
                            let horaInicio = selectedHour.split(' - ')[0].trim()
                            let horaFin = selectedHour.split(' - ')[1].trim()
                            console.log(horaInicio)
                            console.log(horaFin)
                 
                            setStartTime(horaInicio)
                            setEndTime(horaFin)
                            
                        }}
                    >
                        <option value="">Seleccionar ...</option>
                        {availableHours.map((hour, index) => (
                            <option key={index} value={hour}>{hour}</option>
                        ))}
                    </select>
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









            */}
        </div>

        
    )
}