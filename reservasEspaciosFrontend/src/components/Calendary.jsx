import { useState } from 'react';
import { Calendar, dayjsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import dayjs from 'dayjs';
import '../styles/Calendar.css';  

const localizer = dayjsLocalizer(dayjs);

export default function Calendary({ events, onDeleteEvent }) {
  const [selectedFilters, setSelectedFilters] = useState({
    CUBICULO: true,
    BIBLIOTECA: true,
    GIMNASIO: true,
    SALA: true,
  });

  // Filtrar eventos según el filtro seleccionado
  const filteredEvents = events.filter(event => selectedFilters[event.type]);

  // Función para alternar los filtros
  const handleFilterToggle = (type) => {
    setSelectedFilters(prevState => ({
      ...prevState,
      [type]: !prevState[type],
    }));
  };

  // Función para asignar color a cada tipo de evento
  const eventStyleGetter = (event) => {
    let backgroundColor = '';
    
    switch (event.type) {
      case 'BIBLIOTECA':
        backgroundColor = 'red';
        break;
      case 'CUBICULO':
        backgroundColor = 'blue';
        break;
      case 'GIMNASIO':
        backgroundColor = 'green';
        break;
      case 'SALA':
        backgroundColor = 'yellow';
        break;
      default:
        backgroundColor = 'gray';
    }

    return {
      style: {
        backgroundColor,
        color: 'white',
        borderRadius: '5px',
        border: 'none',
        padding: '5px',
      },
    };
  };

  return (
    <div>
      <h1>Pruebas crear agendamientos</h1>

      {/* BOTONES DE FILTRADO */}
      <div>
        <button
          className={`calendar-button button-cubiculo ${selectedFilters.CUBICULO ? 'button-active' : 'button-inactive'}`}
          onClick={() => handleFilterToggle('CUBICULO')}
          style={{ backgroundColor: 'blue', color: 'white' }}
        >
          CUBICULO
        </button>
        <button
          className={`calendar-button button-biblioteca ${selectedFilters.BIBLIOTECA ? 'button-active' : 'button-inactive'}`}
          onClick={() => handleFilterToggle('BIBLIOTECA')}
          style={{ backgroundColor: 'red', color: 'white' }}
        >
          BIBLIOTECA
        </button>
        <button
          className={`calendar-button button-gimnasio ${selectedFilters.GIMNASIO ? 'button-active' : 'button-inactive'}`}
          onClick={() => handleFilterToggle('GIMNASIO')}
          style={{ backgroundColor: 'green', color: 'white' }}
        >
          GIMNASIO
        </button>
        <button
          className={`calendar-button button-sala ${selectedFilters.SALA ? 'button-active' : 'button-inactive'}`}
          onClick={() => handleFilterToggle('SALA')}
          style={{ backgroundColor: 'yellow', color: 'black' }}
        >
          SALA
        </button>
      </div>

      {/* CALENDARIO */}
      <div className="calendar-container">
        <Calendar
          localizer={localizer}
          events={filteredEvents}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          eventPropGetter={eventStyleGetter}  // Asigna los colores a los eventos
          onSelectEvent={onDeleteEvent}  // Pasamos la función para eliminar el evento
        />
      </div>
    </div>
  );
}
