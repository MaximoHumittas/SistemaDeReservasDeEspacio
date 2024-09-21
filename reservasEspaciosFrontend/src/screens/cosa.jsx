import { Calendar, dayjsLocalizer } from 'react-big-calendar'; 
import 'react-big-calendar/lib/css/react-big-calendar.css'; 
import dayjs from 'dayjs';
import { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function CalendarPage() {
    const [formData, setFormData] = useState({
        tipo_agendamiento: '', 
        fecha: '',
        franja_horaria: '',
        n_r: '',
        agendado: ''
    });

    const [selectedDate, setSelectedDate] = useState(null);

    const RegisterData = async (e) => {
        e.preventDefault();
        console.log("Datos", {
            ...formData,
            fecha: selectedDate, // Asegúrate de incluir la fecha seleccionada
        });
    };

    return (
        <div>
            <h2>Calendario</h2>

            <form onSubmit={RegisterData}>
                <div>
                    <label htmlFor="tipo-agendamiento">Tipo de agendamiento</label>
                    <select
                        id="tipo-agendamiento"
                        value={formData.tipo_agendamiento}
                        onChange={(e) => setFormData({ ...formData, tipo_agendamiento: e.target.value })}
                    >
                        <option value="">Seleccione una opción</option>
                        <option value="CUBICULO">Cubículo</option>
                        <option value="GIMNASIO">Gimnasio</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="fecha">Seleccionar Día</label>
                    <DatePicker
                        id="fecha"
                        selected={selectedDate}
                        onChange={(date) => {
                            setSelectedDate(date);
                            setFormData({ ...formData, fecha: date }); // Actualiza la fecha en formData
                        }}
                        dateFormat="dd/MM/yyyy"
                        placeholderText='Seleccionar un día'
                        required
                    />
                </div>

                <div>
                    <label htmlFor="start-time">Hora de inicio</label>
                    <input
                        type="time"
                        id="start-time"
                        onChange={(e) => setFormData({ ...formData, franja_horaria: e.target.value })}
                        required
                    />

                    <label htmlFor="end-time">Hora de término</label>
                    <input
                        type="time"
                        id='end-time'
                        onChange={(e) => setFormData({ ...formData, franja_horaria: e.target.value })}
                        required
                    />
                </div>

                <button type='submit'>Agendar Fecha</button>
            </form>      
        </div>
    );
}

export default CalendarPage;
