import { Calendar, dayjsLocalizer } from 'react-big-calendar'; 
import 'react-big-calendar/lib/css/react-big-calendar.css'; 
import dayjs from 'dayjs';

const localizer = dayjsLocalizer(dayjs);

const events = [
  {
    title: 'Cubiculo, cubiculo 1',
    start: new Date(),
    end: new Date(),
  },
  {
    title: 'Evento 2',
    start: new Date(2024, 9, 24, 12, 0), 
    end: new Date(2024, 9, 24, 14, 0),
  },
];

export default function Calendary() {
  return (
    <div>
      <h1>Pruebas crear agendamientos</h1>

      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>
  );
}
