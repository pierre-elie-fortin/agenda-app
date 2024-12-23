'use client'

import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

moment.locale('fr')
const localizer = momentLocalizer(moment)
interface Event {
    start: Date;
    end: Date;
    title: string;
}

interface Props {
    events: Event[];
}


export default function Calendrier({ events }: Props) {
  return (
    <div style={{ height: '500px' }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        titleAccessor={(events) =>  events.title}
        style={{ height: '100%' }}
        messages={{
          next: "Suivant",
          previous: "Précédent",
          today: "Aujourd'hui",
          month: "Mois",
          week: "Semaine",
          day: "Jour"
        }}
      />
    </div>
  )
}

