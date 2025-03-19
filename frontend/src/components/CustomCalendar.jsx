import React from 'react'
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { useState, useEffect } from 'react';
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import Event from './Event';
import { useColorModeValue } from '@chakra-ui/react';
import { Button, Collapse, Box, Flex, Image, Text, Divider, Skeleton } from '@chakra-ui/react';

const localizer = momentLocalizer(moment);

const CustomCalendar = () => {
  const [show, setShow] = useState(false);
  const [events, setEvents] = useState([]);
  const [eventList, setEventList] = useState([]);
  const [eventListLoading, setEventListLoading] = useState(false);
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
  
              const formattedEvents = data.map(event => ({
                  title: event.title,
                  start: moment.utc(event.startDate).format("YYYY-MM-DD"),
                  end: moment.utc(event.endDate).add(1, 'days').format("YYYY-MM-DD"),
                  allDay: true,
              }))
              console.log("data", data);
              setEventList(data);
              console.log("Event List:", eventList);
              setEvents(formattedEvents);
              console.log("Events Calendar:", events);
              
          } catch (error) {
              
          }
      }
  
      fetchEvents();
    }, []);
  

  return (
    <>
      <Box maxW="100%" overflow="hidden" p={4} > 
        <Collapse
          in={show}
          startingHeight={300}
          animateOpacity
          style={{ overflow: "visible" }}
        >
          <Fullcalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView={"dayGridMonth"}
            headerToolbar={{
              start: "today prev,next",
              center: "title",
              end: "dayGridMonth",
            }}
            width="100%"
            height={"70vh"}
            dayMaxEventRows={2} // Changed from 1 to true
            moreLinkClick="popover" // Optional: shows events in a popover when clicked
            moreLinkText={count => `+${count} more`}
            eventDisplay='block'
            events={events}
            eventOrder={"start,-duration"}
            dayMaxEvents={1} // Add this line - ensures at least one event shows
            dateClick={(info) => console.log(info)}
            dayCellDidMount={(cell) => {
              cell.el.style.cursor = "pointer";
            }}
          />

          <Flex flexDirection={"column"}>
            <Box mt={5}>
              <Text fontSize="xl" fontWeight="bold" >
                📆Events & Activities |  May 25, 2025 
              </Text>
              <Text fontSize="sm" color={useColorModeValue("gray.600", "gray.400")}>Select other date to see events and activities</Text>
            </Box>
            <Divider my={4} />
            {eventListLoading && (
              [0,1,2].map((_, i) => (
                <Flex key={i} gap={4} alignItems={"center"} p={"1"} borderRadius={"md"} mb={2}>
                  <Skeleton h={"150px"} w={"full"}/>
                  <Skeleton h={"150px"} w={"full"}/>
                </Flex>
              ))
            )}
            {!eventListLoading && (
              eventList.length  === 0 ? (
                <Flex flexDirection={"column"} gap={4} justifyContent={"center"} alignItems={"center"} p={"1"} borderRadius={"md"} mb={2}>
                  <Text fontSize="md" color={useColorModeValue("gray.600", "gray.400")} >No events on this day :(</Text>
                  <Image src="/characters/toby_juno_event.png" alt="toby&juno" w={"250px"} />
                </Flex>
              ) : (
                eventList.map((event) => (
                  <Event key={event._id} event={event} />
                ))
              )
            )}
          </Flex>
        </Collapse>
        
      </Box>
      <Button size="sm" onClick={handleShow} mt="1rem" ml={"0.9rem"}>
          Show {show ? "Less" : "More"}
      </Button>
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