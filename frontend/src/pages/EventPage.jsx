import React from 'react'
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


const EventPage = () => {
  const [loading, setLoading] = useState(false);
  const [eventListLoading, setEventListLoading] = useState(false);
  const [userAddedEvents, setUserAddedEvents] = useState([]);
  const showToast = useShowToast();

  const getEvents = async () => {
    setLoading(true);
    try {
      const respone = await fetch("api/events",{
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      });
      
    } catch (error) {
      showToast("error", "An error occurred while fetching events");
    }
    setLoading(false);
  }

  const handleEventAdd = (newEvent) => {
    setUserAddedEvents((prevEvents) => [...prevEvents, newEvent]);
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
                <GlobalCalendar/>
            </Flex>
            <Flex flex={30} gap={2} flexDirection={"column"} maxW={{sm:"250px", md:"full"}} mx={"auto"}>
                <Text fontWeight={700} color={useColorModeValue("gray.600", "gray.400")}>
                    Your Added Events
                </Text>
                <Divider/>
                <AddEventModal/>
                {loading && (
                    [0,1,2].map((_, i) => (
                        <Flex key={i} gap={4} alignItems={"center"} p={"1"} borderRadius={"md"}>
                          <Skeleton h={"100px"} w={"full"}/>
                        </Flex>
                    ))
                )}
                {!loading && (
                    <Flex gap={4} alignItems={"center"} p={"1"} borderRadius={"md"} overflowY={"auto"} h={{base:"450px", md:"500px", lg:"520px"}} flexDirection={"column"}>
                      <UserAddedEvents></UserAddedEvents>
                      <UserAddedEvents></UserAddedEvents>
                    </Flex>
                )}
            </Flex>
        </Flex>
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
            userAddedEvents.length  === 0 ? (
              <Flex gap={4} alignItems={"center"} p={"1"} borderRadius={"md"} mb={2}>
                <Text fontSize="md" color={useColorModeValue("gray.600", "gray.400")} >No events added yet</Text>
              </Flex>
            ) : (
              userAddedEvents.map((event) => (
                <Event key={event._id} event={event} />
              ))
            )
          )};
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