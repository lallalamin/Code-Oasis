import React from 'react'
import { Box, Flex, Text, Button, Tooltip } from '@chakra-ui/react'
import { useColorModeValue } from '@chakra-ui/react'
import { IoLocationSharp } from "react-icons/io5";
import { BsFillPersonCheckFill } from "react-icons/bs";
import { IoCalendarOutline } from "react-icons/io5";
import { IoTimeOutline } from "react-icons/io5";
import { Link as routerLink } from 'react-router-dom'
import useShowToast from '../hooks/useShowToast';
import EditEventModal from './EditEventModal';
import { useState } from 'react';

const UserAddedEvents = ({event, onEventUpdate, onEventDelete}) => {
  const showToast = useShowToast();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const formattedStartDate = new Date(event.startDate).toLocaleDateString("en-US", {
    year: "numeric", // Example: "2025"
    month: "short", // Example: "Mar"
    day: "numeric", // Example: "22"
  });

  const formattedEndDate = new Date(event.endDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const formattedRegistrationDate = new Date(event.registrationDeadline).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const handleDeleteEvent = async () => {
    try {
      const response = await fetch(`/api/events/delete/${event._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (data.error) {
        showToast("error", data.error);
        return;
      }

      onEventDelete(event._id);
      showToast("success", "Event deleted successfully");
    } catch (error) {
      showToast("error", "An error occurred while deleting the event");
    }
  }

  return (
    <>
      <Box w={"full"} bg={useColorModeValue("gray.200", "gray.dark")} p={4} borderRadius={"md"}>
        <Flex gap={2} flexDirection={"column"}>
          <Flex justifyContent={"space-between"}>
            <Text fontSize={"xl"} fontWeight={"bold"}>{event.title}</Text>
          </Flex>
          <Flex w={"50%"} bg={"blue.300"}  borderRadius={"full"} justifyContent={"center"}>
            <Text fontSize={"sm"} px={1}>{event.eventType}</Text>
          </Flex>
          <Flex>
            <IoLocationSharp size={20} color={"blue.400"} />
            <Flex>
              <Text ml={2} fontSize={"sm"}>{event.location}</Text>
            </Flex> 
          </Flex>
          <Flex>
              <BsFillPersonCheckFill size={20} />
              <Text ml={2} fontSize={"sm"} fontWeight={"bold"}>Eligibility: </Text>
              <Text ml={2} fontSize={"sm"}>{event.eligibility}</Text>
            </Flex>
          <Flex flexDirection={"row"} justifyContent={"space-between"}>
            <Flex flexDirection={"column"}>
              <Text fontSize={"sm"} fontWeight={"bold"}>Registration Deadline: </Text>
              <Text fontSize={"sm"}>{!event.registrationDeadline ? "No Info" : formattedRegistrationDate}</Text>
            </Flex>
            <Flex>
              <Tooltip label={event.link} placement='bottom'>
                <Button size={"sm"} fontSize={"sm"} as={routerLink} to={`${event.link}`} target={"_blank"}> Link</Button>
              </Tooltip>
            </Flex>
          </Flex>
          
          <Flex mb={2}>
            <Flex mr={4}>
              <IoCalendarOutline size={20} color={"blue.400"} />
              <Text ml={2} fontSize={"sm"}>{formattedStartDate} - {formattedEndDate}</Text>
            </Flex>
            <Flex>
              <IoTimeOutline size={20} />
              <Text ml={2} fontSize={"sm"}>{event.time} {event.timeZone} {event.timeZone}</Text>
            </Flex>
          </Flex> 
          <Flex bg={useColorModeValue("gray.100", "#313131")} flexDirection={"column"} p={3} borderRadius={"md"}>
            <Text fontSize={"sm"} fontWeight={"bold"}>Description</Text>
            <Text fontSize={"sm"} mt={2}>
              {event.description}
            </Text>
          </Flex>
      </Flex>
      <Flex justifyContent={"flex-end"} mt={3} alignItems={"center"} gap={2}>
        <Button size={"sm"} fontSize={"sm"} onClick={() => setIsEditModalOpen(true)}>Edit</Button>
        <Button size={"sm"} fontSize={"sm"} colorScheme='red' onClick={handleDeleteEvent}>Delete</Button>
      </Flex>
      <EditEventModal
        event={event}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onEventUpdate={onEventUpdate}
      />
      </Box>
    </>
  )
}

export default UserAddedEvents