import { useState } from 'react';
import { Calendar, dayjsLocalizer } from 'react-big-calendar'; 
import 'react-big-calendar/lib/css/react-big-calendar.css'; 
import dayjs from 'dayjs';
import '../styles/Calendar.css';  

const localizer = dayjsLocalizer(dayjs);

const allEvents = [
  {
    title: 'Cubiculo, cubiculo 1',
    start: new Date(),
    end: new Date(),
    type: 'CUBICULO',
    style: { backgroundColor: 'blue', color: 'white' }, 
  },
  {
    title: 'Biblioteca, sala 2',
    start: new Date(2024, 9, 24, 12, 0), 
    end: new Date(2024, 9, 24, 14, 0),  
    type: 'BIBLIOTECA',
    style: { backgroundColor: 'red', color: 'white' }, 
  },
];

export default function Calendary() {
  const [selectedFilters, setSelectedFilters] = useState({
    CUBICULO: true,
    BIBLIOTECA: true,
  });

  const filteredEvents = allEvents.filter(event => selectedFilters[event.type]);

  const handleFilterToggle = (type) => {
    setSelectedFilters(prevState => ({
      ...prevState,
      [type]: !prevState[type],
    }));
  };

  return (
    <div>
      <h1>Pruebas crear agendamientos</h1>
      
      {/*BOTONES DE FILTRADO */}
      <div>
        <button
          className={`calendar-button button-cubiculo ${selectedFilters.CUBICULO ? 'button-active' : 'button-inactive'}`}
          onClick={() => handleFilterToggle('CUBICULO')}
        >
          CUBICULO
        </button>
        <button
          className={`calendar-button button-biblioteca ${selectedFilters.BIBLIOTECA ? 'button-active' : 'button-inactive'}`}
          onClick={() => handleFilterToggle('BIBLIOTECA')}
        >
          BIBLIOTECA
        </button>
      </div>

      {/* CALENDARIO COMO TAL */}
      <div className="calendar-container">
        <Calendar
          localizer={localizer}
          events={filteredEvents}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          eventPropGetter={(event) => ({
            style: event.style || {},
          })}
        />
      </div>
    </div>
  );
}
