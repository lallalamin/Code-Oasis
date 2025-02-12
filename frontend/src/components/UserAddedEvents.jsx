import React from 'react'
import { Box, Flex, Text, Button, Tooltip } from '@chakra-ui/react'
import { useColorModeValue } from '@chakra-ui/react'
import { IoLocationSharp } from "react-icons/io5";
import { BsFillPersonCheckFill } from "react-icons/bs";
import { IoCalendarOutline } from "react-icons/io5";
import { IoTimeOutline } from "react-icons/io5";
import { Link as routerLink } from 'react-router-dom'

const UserAddedEvents = () => {
    const handleCreateEvent = async () => {}
    const handleDeleteEvent = async () => {}
  return (
    <>
      <Box w={"full"} bg={useColorModeValue("gray.200", "gray.dark")} p={4} borderRadius={"md"}>
        <Flex gap={2} flexDirection={"column"}>
          <Flex justifyContent={"space-between"}>
            <Text fontSize={"xl"} fontWeight={"bold"}>Hack the North</Text>
          </Flex>
          <Flex w={"50%"} bg={"blue.300"}  borderRadius={"full"} justifyContent={"center"}>
            <Text fontSize={"sm"} px={1}>Hackathon</Text>
          </Flex>
          <Flex>
            <IoLocationSharp size={20} color={"blue.400"} />
            <Flex>
              <Text ml={2} fontSize={"sm"}>University of Toronto</Text>
            </Flex> 
          </Flex>
          <Flex>
              <BsFillPersonCheckFill size={20} />
              <Text ml={2} fontSize={"sm"} fontWeight={"bold"}>Eligibility: </Text>
              <Text ml={2} fontSize={"sm"}>Undergraduate</Text>
            </Flex>
          <Flex flexDirection={"row"} justifyContent={"space-between"}>
            <Flex flexDirection={"column"}>
              <Text fontSize={"sm"} fontWeight={"bold"}>Registration Deadline: </Text>
              <Text fontSize={"sm"}>May 30, 2022</Text>
            </Flex>
            <Flex>
              <Tooltip label={"https://hackthenorth.com/"} placement='bottom'>
                <Button size={"sm"} fontSize={"sm"} as={routerLink} to={"https://hackthenorth.com/"} target={"_blank"}> Link</Button>
              </Tooltip>
            </Flex>
          </Flex>
          
          <Flex mb={2}>
            <Flex mr={4}>
              <IoCalendarOutline size={20} color={"blue.400"} />
              <Text ml={2} fontSize={"sm"}>May 30, 2022</Text>
            </Flex>
            <Flex>
              <IoTimeOutline size={20} />
              <Text ml={2} fontSize={"sm"}>8:00 AM</Text>
            </Flex>
          </Flex> 
          <Flex bg={useColorModeValue("gray.100", "#313131")} flexDirection={"column"} p={3} borderRadius={"md"}>
            <Text fontSize={"sm"} fontWeight={"bold"}>Description</Text>
            <Text fontSize={"sm"} mt={2}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quia.
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quia.
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quia.
            </Text>
          </Flex>
      </Flex>
      <Flex justifyContent={"flex-end"} mt={3} alignItems={"center"} gap={2}>
        <Button size={"sm"} fontSize={"sm"}>Edit</Button>
        <Button size={"sm"} fontSize={"sm"} colorScheme='red'>Delete</Button>
      </Flex>
      </Box>
    </>
  )
}

export default UserAddedEvents