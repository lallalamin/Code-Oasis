import React from 'react'
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { useState, useEffect } from 'react';
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Button, Collapse, Box } from '@chakra-ui/react';
import useShowToast from '../hooks/useShowToast';
import userAtom from '../atoms/userAtom';
import { useRecoilValue } from 'recoil';

const localizer = momentLocalizer(moment);

const GlobalCalendar = () => {
  const [show, setShow] = useState(false);
  const user = useRecoilValue(userAtom);
  const [events, setEvents] = useState([]);
  const showToast = useShowToast();

  const handleShow = () => setShow(!show);

  useEffect(() => {
    const fetchEvents = async () => {
        try {
            const response = await fetch('/api/events/',
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();

            if (data.error) {
                showToast("Error", data.error, "error");
                return;
            }

            setEvents(data);
            
        } catch (error) {
            
        }
    }

    fetchEvents();
  }, []);

  return (
    <>
      <Box overflow="hidden" p={2} width="100%"> 
          <Fullcalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView={"dayGridMonth"}
            headerToolbar={{
              start: "today prev,next", // Left side of the toolbar
              center: "title", // Center of the toolbar
              end: "dayGridMonth", // Right side of the toolbar - ,timeGridWeek,timeGridDay
            }}
            width="100%"
            height={"70vh"} // Adjust calendar height to fit expanded container
          />
      </Box>
    </>
  )
}

export default GlobalCalendar

    
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