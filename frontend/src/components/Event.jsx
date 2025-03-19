import { Flex, Text, Box, Button, Avatar } from '@chakra-ui/react'
import React from 'react'
import { Link as routerLink } from 'react-router-dom'
import { IoLocationSharp } from "react-icons/io5";
import { BsFillPersonCheckFill } from "react-icons/bs";
import { IoCalendarOutline } from "react-icons/io5";
import { IoTimeOutline } from "react-icons/io5";
import { useColorModeValue } from '@chakra-ui/react'

const Event = ({event}) => {
  const formattedStartDate = new Date(event.startDate).toLocaleDateString("en-US", {
    year: "numeric", // Example: "2025"
    month: "short", // Example: "Mar"
    day: "numeric", // Example: "22"
    timeZone: "UTC", // "UTC" to avoid timezone conversion
  });

  const formattedEndDate = new Date(event.endDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });

  const formattedRegistrationDate = new Date(event.registrationDeadline).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
  return (
    <>
        <Box bg={useColorModeValue("gray.200", "gray.dark")} p={4} borderRadius={"md"} mb={2}>
            <Flex gap={2} flexDirection={"column"}>
                <Flex justifyContent={"space-between"} mb={2}>
                  <Text fontSize={"xl"} fontWeight={"bold"}>{event.title}</Text>
                  <Flex bg={"blue.300"} p={1} borderRadius={"full"} h={"30px"} alignItems={"center"}>
                    <Text px={1} fontSize={"md"} >{event.eventType}</Text>
                  </Flex>
                </Flex>
                <Flex justifyContent={"space-between"}>
                  <Flex>
                    <IoLocationSharp size={20} color={"blue.400"} />
                    <Text ml={2} fontSize={"sm"}>{event.isVirtual && event.location ? event.location + " (+ Virtual)" : event.location ? event.location : "Virtual"}</Text>
                  </Flex>
                  <Flex>
                    <BsFillPersonCheckFill size={20} />
                    <Text ml={2} fontSize={"sm"} fontWeight={"bold"}>Eligibility: </Text>
                    <Text ml={2} fontSize={"sm"}>{event.eligibility}</Text>
                  </Flex>
                </Flex>
                <Flex justifyContent={"space-between"} alignItems={"center"}>
                  <Flex>
                    <Text fontSize={"sm"} fontWeight={"bold"}>Registration Deadline: </Text>
                    <Text ml={2} fontSize={"sm"}>{!event.registrationDeadline ? "No Info" : formattedRegistrationDate}</Text>
                  </Flex>
                  <Flex>
                    <Button size={"sm"} fontSize={"sm"} ml={2} as={routerLink} to={`${event.link}`} target={"_blank"}> Link</Button>
                  </Flex>
                </Flex>
                <Flex mb={2}>
                  <Flex mr={4}>
                    <IoCalendarOutline size={20} color={"blue.400"} />
                    <Text ml={2} fontSize={"sm"}>{formattedStartDate} - {formattedEndDate}</Text>
                  </Flex>
                  <Flex>
                    <IoTimeOutline size={20} />
                    <Text ml={2} fontSize={"sm"}>{event.time} {event.timezone}</Text>
                  </Flex>
                </Flex> 
                <Flex bg={useColorModeValue("gray.100", "#313131")} flexDirection={"column"} p={2} borderRadius={"md"}>
                  <Text fontSize={"sm"} fontWeight={"bold"}>Description</Text>
                  <Text fontSize={"sm"} mt={2}>
                    {event.description}
                  </Text>
                </Flex>
            </Flex>
            <Flex justifyContent={"flex-end"} mt={2} alignItems={"center"}>
              <Text ml={2} fontSize={"sm"}>{event.postedBy.username}</Text>
              <Avatar size={"sm"} ml={2} name='John Doe' src={`${event.postedBy.profilePic}`} />
            </Flex>
        </Box>
    </>
  )
}

export default Event