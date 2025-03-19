import React, { useEffect } from 'react'
import { Text, Divider, Input, Button, Flex, Image, Skeleton, SkeletonCircle, Box, SimpleGrid } from '@chakra-ui/react'
import { InformationCircleOutlineIcon } from 'chakra-ui-ionicons';
import { HelpCircleOutlineIcon } from 'chakra-ui-ionicons';
import { useColorModeValue } from '@chakra-ui/react';
import GlobalCalendar from '../components/GlobalCalendar'
import { useState } from 'react';
import Event from '../components/Event';
import UserAddedEvents from '../components/UserAddedEvents';
import useShowToast from '../hooks/useShowToast';
import AddEventModal from '../components/AddEventModal';
import { useRecoilValue } from 'recoil';
import userAtom from '../atoms/userAtom';
import moment from 'moment';


const EventPage = () => {
  const [loading, setLoading] = useState(false);
  const [eventListLoading, setEventListLoading] = useState(false);
  const [userAddedEvents, setUserAddedEvents] = useState([]);
  const [eventList, setEventList] = useState([]);
  const [allEvent, setAllEvent] = useState([]);
  const todayDate = moment(new Date()).format("MMM D, YYYY");
  const [selectedDate, setSelectedDate] = useState(todayDate);
  const showToast = useShowToast();
  const user = useRecoilValue(userAtom);
  

  useEffect(() => {
    const getUserEvents = async () => {
      setLoading(true);
      try {
        const response = await fetch(`api/events/${user._id}`,{
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          }
        });
        const data = await response.json();
        if (response.ok) {
          setUserAddedEvents(data);
        }
        else {
          showToast("error", data.error);
        }
        console.log("User added events raw:", data);
        console.log("User added events:", userAddedEvents);
        
      } catch (error) {
        showToast("error", "An error occurred while fetching events");
      }
      setLoading(false);
    }

    const getAllEvents = async () => {
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

        setAllEvent(data);

        const todayEvents = data.filter(event => {
          moment.utc(event.startDate).format("MMM D, YYYY") === todayDate;
        });

        setEventList(todayEvents);
      }
      catch (error) {
        showToast("error", "An error occurred while fetching events");
      }
    }
    
    getUserEvents();
    getAllEvents();

  }, [user]);

  const filteredEvents = selectedDate ? allEvent.filter(event => moment.utc(event.startDate).format("MMM D, YYYY") === selectedDate) : allEvent;
    

  
  const handleEventAdd = (newEvent) => {
    setUserAddedEvents((prevEvents) => [...prevEvents, newEvent]);
    console.log("updated events:", userAddedEvents);
  }

  const handleEventUpdate = (eventId, updatedEvent) => {
    setUserAddedEvents((prevEvents) => prevEvents.map((event) => (event._id === eventId ? { ...event, ...updatedEvent } : event)));
  }

  const handleEventDelete = (eventId) => {
    setUserAddedEvents((prevEvents) => prevEvents.filter((event) => event._id !== eventId));
  }

  return (
    <>
      <Text fontSize="2xl" fontWeight="bold" my={1}>
          Events Calendar
      </Text>
      <Divider my={4} />

      <Box>
        <Flex gap={2} flexDirection={{base:"column", md:"row"}} maxW={{sm:"400px", md:"full"}} mx={"auto"} >
            <Flex flex={70} >
                <GlobalCalendar onDateSelect={setSelectedDate}/>
            </Flex>
            <Flex flex={30} gap={2} flexDirection={"column"} maxW={{sm:"250px", md:"full"}} mx={"auto"}>
                <Text fontWeight={700} color={useColorModeValue("gray.600", "gray.400")}>
                    Your Added Events
                </Text>
                <Divider/>
                <AddEventModal onEventAdd={handleEventAdd}/>
                {loading && (
                    [0,1,2].map((_, i) => (
                        <Flex key={i} gap={4} alignItems={"center"} p={"1"} borderRadius={"md"}>
                          <Skeleton h={"100px"} w={"full"}/>
                        </Flex>
                    ))
                )}
                {!loading && (
                    userAddedEvents.length === 0 ? (
                        <Flex gap={4} flexDirection={"column"} justifyContent={"center"} alignItems={"center"} p={"1"} borderRadius={"md"}>
                          <Text fontSize="md" color={useColorModeValue("gray.600", "gray.400")} >No events added</Text>
                          <Image src="/characters/quill_userevent.png" alt="quill" w={"150px"} />
                        </Flex>
                    ) : (
                        <Flex gap={4} alignItems={"center"} p={"1"} borderRadius={"md"} overflowY={"auto"} h={{base:"450px", md:"500px", lg:"520px"}} flexDirection={"column"}>
                        {userAddedEvents.map((event) => (
                            <UserAddedEvents key={event._id} event={event} onEventUpdate={handleEventUpdate} onEventDelete={handleEventDelete} />
                        ))}
                        </Flex>
                      )
                    )
                }
            </Flex>
        </Flex>
        <Flex flexDirection={"column"}>
          <Box mt={5}>
            <Text fontSize="xl" fontWeight="bold" >
              📆Events & Activities |  {selectedDate}
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
              filteredEvents.map((event) => (
                <Event key={event._id} event={event} />
              ))
            )
          )}
        </Flex>
      </Box>
      

      
    </>
  )
}

export default EventPage

{/* <form onSubmit={handleConversationSearch}>
  <Flex alignItems={"center"} gap={2}>
      <Input placeholder='Search for a user...' onChange={(e) => setSearchText(e.target.value)} />
      <Button size={"sm"} onClick={handleConversationSearch} isLoading={searchingUser}>
          <SearchIcon/>
      </Button>
  </Flex>
</form> */}