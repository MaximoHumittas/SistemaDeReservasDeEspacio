import 'react-big-calendar/lib/css/react-big-calendar.css'; 
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { reserveRequest, resourceRequest, hoursRequest } from '../api/auth';
import { format } from 'date-fns';
import Calendary from 'reservasEspaciosFrontend/src/components/Calendary.jsx'; // Importa el nuevo componente

export default function Formulary() {
  
  const { register, handleSubmit, setValue, getValues } = useForm();
  const [startDate, setStartDate] = useState(null);
  const [availableHours, setAvailableHours] = useState([]);
  const [busyHours, setBusyHours] = useState([]);
  const [idResources, setIdResources] = useState([]);

  const GetResourcesByType = async (event) => {
    const resourceType = event.target.value;

    if (resourceType) {
      try {
        const response = await resourceRequest(event.target.value);
        setIdResources(response);
        console.log("datos del register: ", register);
      } catch (error) {
        console.log("Error en obtner el dato", error);
      }
    }
  };

  const GetHoraryById = async (dateDataPicker) => {
    const dataFormated = format(dateDataPicker, 'yyyy-MM-dd');
    setValue("date", dataFormated);

    console.log("ID Resources:", idResources);
    console.log("ID Resources:", idResources['data'][0]);
    setValue("resourceId", idResources['data'][0]['id']);
    console.log("Formatted date:", dataFormated);
    let auxBusyHours = [];
    let auxAvailableHours = [];

    try {
      const response = await hoursRequest(idResources['data'][0], dataFormated);

      if (response) {
        console.log("response data", response);
        console.log(response.length);

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

            if (index == 9) {
              endTime = `${index + 1}:00`;
            } else {
              endTime = `0${index + 1}:00`;
            }
          }
          auxAvailableHours.push(startTime + ' - ' + endTime);
        }

        console.log("Aux available hours ", auxAvailableHours);
        console.log("Aux busy hours ", auxBusyHours);
        const availableHours = auxAvailableHours.filter(
          (hour) => !auxBusyHours.includes(hour)
        );

        setAvailableHours(availableHours);
      } else {
        console.log("No data found in the response");
      }
    } catch (error) {
      console.log("Error al obtener los horarios ", error);
    }
  };

  const onSubmit = async (values) => {
    console.log("Valores que se envian a reserva ", values);
    try {
      const response = await reserveRequest(values);
      console.log(response);
    } catch (error) {
      console.log("Error al enviar la solicitud:", error);
    }
  };

  return (
    <div>
      {/* Calendario (Componente separado) */}
      <Calendary />

      {/* Formulario */}
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
          <div>
            <label>Seleccionar Dia</label>
            <DatePicker
              selected={startDate}
              onChange={(date) => {
                setStartDate(date);
                GetHoraryById(date);
              }}
              dateFormat="yyyy/MM/dd"
              placeholderText="Seleccionar fecha"
              required
            />
          </div>
        </div>
        <label>Elige la hora</label>
        <select {...register("hour", { required: "Selecciona una hora" })}>
          <option value="">Seleccionar...</option>
          {availableHours.map((hour) => (
            <option key={hour} value={hour}>
              {hour}
            </option>
          ))}
        </select>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}
