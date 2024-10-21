import axios from 'axios';

import 'react-big-calendar/lib/css/react-big-calendar.css'; 
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { reserveRequest, resourceRequest, hoursRequest } from '../api/auth';
import { format } from 'date-fns';
import Calendary from '../components/Calendary'; // Importa el componente Calendary
import { AuthContext } from "../context/AuthContext";
import '../styles/Formulary.css'; // Importa la hoja de estilos CSS

export default function Formulary() {
  const { user } = useContext(AuthContext);

  const { register, handleSubmit, setValue } = useForm();
  const [startDate, setStartDate] = useState(null);
  const [availableHours, setAvailableHours] = useState([]);
  const [idResources, setIdResources] = useState([]);
  const [isResourceTypeSelected, setIsResourceTypeSelected] = useState(false);
  const [selectedResourceType, setSelectedResourceType] = useState('');
  const [events, setEvents] = useState([]); // Estado para los eventos del calendario
  const [errorMessages, setErrorMessages] = useState({
    date: '',
    hour: '',
  });

  // Verificamos si user existe y tiene un rol asignado
  if (!user) {
    return <p>Cargando información del usuario...</p>;
  }

  // Obtener recursos según el tipo seleccionado
  const GetResourcesByType = async (event) => {
    const resourceType = event.target.value;
    setSelectedResourceType(resourceType);
    if (resourceType) {
      try {
        const response = await resourceRequest(resourceType);
        if (response.length > 0) {
          setIdResources(response);
          setValue("recurso_id", response[0].id); 
          setIsResourceTypeSelected(true);
          setErrorMessages({ date: '', hour: '' });
        } else {
          setErrorMessages({ date: '', hour: 'No hay recursos disponibles para este tipo.' });
        }
      } catch (error) {
        console.log("Error al obtener los recursos", error);
      }
    } else {
      setIsResourceTypeSelected(false);
      setErrorMessages({ date: '', hour: '' });
    }
  };

  const GetHoraryById = async (dateDataPicker) => {
    const dataFormated = format(dateDataPicker, 'yyyy-MM-dd');
    setValue("fecha", dataFormated);

    if (idResources.length > 0) {
      const recurso_id = idResources[0].id; 
      setValue("recurso_id", recurso_id);

      let auxBusyHours = [];
      let auxAvailableHours = [];

      try {
        const response = await hoursRequest(recurso_id, dataFormated);
        if (response) {
          for (let index = 0; index < response.length; index++) {
            const starTime = response[index]['hora_inicio'].substring(0, 5);
            const endTime = response[index]['hora_fin'].substring(0, 5);
            auxBusyHours.push(starTime + ' - ' + endTime);
          }
          setAvailableHours(generateAvailableHours(auxBusyHours));
        }
      } catch (error) {
        console.log("Error al obtener los horarios", error);
      }
    }
  };

  const generateAvailableHours = (busyHours) => {
    let auxAvailableHours = [];
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

    const availableHours = auxAvailableHours.filter(hour => !busyHours.includes(hour));
    return availableHours;
  };

  const onSubmit = async (values) => {
    values.usuario_id = user.id;
    const [hora_inicio, hora_fin] = values.hour.split(' - '); 
    values.hora_inicio = hora_inicio;
    values.hora_fin = hora_fin;

    try {
      const response = await reserveRequest(values);
      alert("Reserva realizada con éxito");
      console.log(response);

      if (response.data) {
        const newEvent = {
          id: response.data.id,  // Usa el ID de la reserva devuelto por el backend
          title: `Reserva ${values.recurso_id}`,
          start: new Date(`${values.fecha}T${values.hora_inicio}`),
          end: new Date(`${values.fecha}T${values.hora_fin}`),
          type: selectedResourceType
        };
        setEvents(prevEvents => [...prevEvents, newEvent]); // Actualiza los eventos del calendario
      }
    } catch (error) {
      console.log("Error al enviar la solicitud:", error);
      alert("Hora ocupada intente otra");
    }
  };

  const handleDeleteEvent = async (event) => {
    if (window.confirm(`¿Estás seguro de que deseas eliminar la reserva: ${event.title}?`)) {
      try {
        // Cambia la ruta al backend donde tienes definida la eliminación de reserva
        const response = await axios.delete('http://localhost:3000/api/eliminarReserva', {
          data: { idReserva: event.id }
        });
        console.log(response.data.message);

        // Eliminar el evento del estado local
        setEvents(prevEvents => prevEvents.filter(e => e.id !== event.id));
        alert('Reserva eliminada con éxito');
      } catch (error) {
        console.error('Error al eliminar la reserva:', error);
        alert('Hubo un problema al eliminar la reserva');
      }
    }
  };

  return (
    <div className="form-container">
      <Calendary events={events} onDeleteEvent={handleDeleteEvent} />

      <h1 className="form-title">Formulario de Reserva</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="form-label">Tipo de recurso</label>
          <select 
            {...register("recurso_id", { required: "Selecciona un tipo de recurso" })}
            value={selectedResourceType}
            onChange={GetResourcesByType}
            className="form-select"
          >
            <option value="">Seleccionar...</option>
            {user.role === 'estudiante' && (
              <>
                <option value="CUBICULO">Cubículo</option>
                <option value="GIMNASIO">Gimnasio</option>
                <option value="BIBLIOTECA">Biblioteca</option>
              </>
            )}
            {user.role === 'docente' && (
              <>
                <option value="SALA">Sala</option>
                <option value="GIMNASIO">Gimnasio</option>
                <option value="BIBLIOTECA">Biblioteca</option>
              </>
            )}
          </select>
        </div>

        <div>
          <label className="form-label">Seleccionar Día</label>
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
            className="form-input"
          />
          {errorMessages.date && (
            <p className="error-message">{errorMessages.date}</p>
          )}
        </div>

        <div>
          <label className="form-label">Seleccione la hora</label>
          <select 
            {...register("hour", { required: "Selecciona una hora" })}
            disabled={!isResourceTypeSelected} 
            className="form-select"
          >
            <option value="">Seleccionar...</option>
            {availableHours.map(hour => (
              <option key={hour} value={hour}>{hour}</option>
            ))}
          </select>
          {errorMessages.hour && (
            <p className="error-message">{errorMessages.hour}</p>
          )}
        </div>

        <button type="submit" className="submit-button" disabled={!isResourceTypeSelected}>Enviar</button>
      </form>
    </div>
  );
}
