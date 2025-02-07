import React from 'react'
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { useState, useEffect } from 'react';
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Button, Collapse, Box } from '@chakra-ui/react';

const localizer = momentLocalizer(moment);

const CustomCalendar = () => {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(!show);

  return (
    <>
      <Box maxW="100%" overflow="hidden" p={4} > 
          <Fullcalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView={"dayGridMonth"}
            headerToolbar={{
              start: "today prev,next", // Left side of the toolbar
              center: "title", // Center of the toolbar
              end: "dayGridMonth,timeGridWeek,timeGridDay", // Right side of the toolbar - ,timeGridWeek,timeGridDay
            }}
            height={"70vh"} // Adjust calendar height to fit expanded container
          />
      </Box>
    </>
  )
}

export default CustomCalendar

    
      {/* <div className="custom-calendar-container">
        <h2 className="calendar-header">January 2025</h2>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          defaultDate={new Date(2025, 0, 1)} // Default to January 2025
          style={{ height: "80vh" }}
        />
      </div> */}