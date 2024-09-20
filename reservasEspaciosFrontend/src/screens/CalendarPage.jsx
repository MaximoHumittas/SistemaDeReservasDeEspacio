import { Calendar, dayjsLocalizer } from 'react-big-calendar'; 
import 'react-big-calendar/lib/css/react-big-calendar.css'; 
import dayjs from 'dayjs';

function CalendarPage() {

    const localizer = dayjsLocalizer(dayjs);

    return (
        <div>
            <p>calendario</p>

            
            <Calendar
                localizer={localizer}
                events={[]} 
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500, width: 500 }}
            />


            
            
        </div>
    );
}

export default CalendarPage;