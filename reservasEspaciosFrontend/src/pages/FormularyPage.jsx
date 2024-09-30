import 'react-big-calendar/lib/css/react-big-calendar.css'; 
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import React from 'react';
import { reserveRequest, resourceRequest, hoursRequest } from '../api/auth';
import { format } from 'date-fns';

export default function Formulary(){

    const { register, handleSubmit, setValue, getValues  } = useForm();
    const [startDate, setStartDate] = useState(null);
    const [availableHours, setAvailableHours] = useState([]);
    const [busyHours, setBusyHours] = useState([]);
    const [idResources, setIdResources] = useState([]);
    const [isResourceTypeSelected, setIsResourceTypeSelected] = useState(false);//indica si el usuario ha seleccionado un tipo de recurso.
    const [errorMessages, setErrorMessages] = useState({
        date: '',
        hour: '',
    });

    const GetResourcesByType = async (event) => {
        const resourceType = event.target.value;
        if (resourceType) {
            try {
                const response = await resourceRequest(resourceType);
                setIdResources(response);
                setIsResourceTypeSelected(true);
                setErrorMessages({ date: '', hour: '' }); // Limpiar mensajes de error
            } catch (error) {
                console.log("Error en obtener el dato", error);
            }
        } else {
            setIsResourceTypeSelected(false);
            setErrorMessages({ date: '', hour: '' });
        }
    };

    //se ejecuta cuando el usuario intenta interactuar con un input deshabilitado
    const handleBlockedClick = (field) => {
        if (!isResourceTypeSelected) {
            setErrorMessages(prevState => ({
                ...prevState,
                [field]: "Por favor, selecciona primero el tipo de recurso."
            }));
        }
    };

    const GetHoraryById = async (dateDataPicker) => {
        const dataFormated = format(dateDataPicker, 'yyyy-MM-dd');
        setValue("date", dataFormated);
        setValue("resourceId", idResources['data'][0]['id']);

        let auxBusyHours = [];
        let auxAvailableHours = [];

        try {
            const response = await hoursRequest(idResources['data'][0], dataFormated);
            if (response) {
                for (let index = 0; index < response.length; index++) {
                    const starTime = response[index]['hora_inicio'].substring(0, 5);
                    const endTime = response[index]['hora_fin'].substring(0, 5);
                    auxBusyHours.push(starTime + ' - ' + endTime);
                }
                setBusyHours(auxBusyHours);

                for (let index = 8; index <= 19; index++) {
                    let startTime = `${index}:00`;
                    let endTime = `${index + 1}:00`;

                    if (index <= 9) {
                        startTime = `0${index}:00`;
                        if (index === 9) {
                            endTime = `${index + 1}:00`;
                        } else {
                            endTime = `0${index + 1}:00`;
                        }
                    }
                    auxAvailableHours.push(startTime + ' - ' + endTime);
                }

                const availableHours = auxAvailableHours.filter(hour => !auxBusyHours.includes(hour));
                setAvailableHours(availableHours);
            } else {
                console.log("No data found in the response");
            }
        } catch (error) {
            console.log("Error al obtener los horarios ", error);
        }
    };

    const onSubmit = async (values) => {
        try {
            const response = await reserveRequest(values);
            console.log(response);
        } catch (error) {
            console.log("Error al enviar la solicitud:", error);
        }
    };

    return (
        <div>
            <h1>Formulario</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>Tipo de recurso</label>
                    <select 
                        {...register("resourceType", { required: "Selecciona un tipo de recurso" })}
                        onChange={GetResourcesByType}
                    >
                        <option value="">Seleccionar...</option>
                        <option value="CUBICULO">Cubiculo</option>
                        <option value="GIMNASIO">Gimnasio</option>
                    </select>
                </div>
                <div style={{ position: 'relative' }}>
                    <label>Seleccionar Día</label>
                    <DatePicker
                        selected={startDate}
                        onChange={(date) => {
                            setStartDate(date);
                            GetHoraryById(date);
                        }} 
                        dateFormat="yyyy/MM/dd" 
                        placeholderText="Seleccionar fecha"
                        required 
                        disabled={!isResourceTypeSelected} 
                    />
                    {!isResourceTypeSelected && (
                        //div captura los intentos de clic en los inputs cuando están deshabilitados y muestra un mensaje de error al usuario.
                        <div 
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                background: 'transparent',
                                cursor: 'not-allowed'
                            }}
                            onClick={() => handleBlockedClick('date')}
                        />
                    )}
                    {errorMessages.date && (
                        <p style={{ color: 'red' }}>{errorMessages.date}</p>
                    )}
                </div>
                <div style={{ position: 'relative' }}>
                    <label>Seleccione la hora</label>
                    <select 
                        {...register("hour", { required: "Selecciona una hora" })}
                        disabled={!isResourceTypeSelected} 
                    >
                        <option value="">Seleccionar...</option>
                        {availableHours.map(hour => (
                            <option key={hour} value={hour}>{hour}</option>
                        ))}
                    </select>
                    {!isResourceTypeSelected && (
                        <div 
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                background: 'transparent',
                                cursor: 'not-allowed'
                            }}
                            onClick={() => handleBlockedClick('hour')}
                        />
                    )}
                    {errorMessages.hour && (
                        <p style={{ color: 'red' }}>{errorMessages.hour}</p>
                    )}
                </div>
                <button type="submit" disabled={!isResourceTypeSelected}>Enviar</button>
            </form>
        </div>
    );
}
