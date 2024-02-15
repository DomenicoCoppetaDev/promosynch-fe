import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';


export default function MyMultiMonthCalendar({events}) {

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  const today = new Date();
  console.log(today);

  const calendarOptions = {
    plugins: [dayGridPlugin],
    height: 400,
    events: events,
  };

  return (
    <FullCalendar className="mt-5"
      {...calendarOptions}
    />
  );
};


