import { Flex, Text, Box, Button, Avatar } from '@chakra-ui/react'
import React from 'react'
import { Link as routerLink } from 'react-router-dom'
import { IoLocationSharp } from "react-icons/io5";
import { BsFillPersonCheckFill } from "react-icons/bs";
import { IoCalendarOutline } from "react-icons/io5";
import { IoTimeOutline } from "react-icons/io5";
import { useColorModeValue } from '@chakra-ui/react'

const Event = () => {
  return (
    <>
        <Box bg={useColorModeValue("gray.200", "gray.dark")} p={4} borderRadius={"md"}>
            <Flex gap={2} flexDirection={"column"}>
                <Flex justifyContent={"space-between"} mb={2}>
                  <Text fontSize={"xl"} fontWeight={"bold"}>Hack the North</Text>
                  <Flex bg={"blue.300"} p={1} borderRadius={"full"}>
                    <Text px={1} fontSize={"md"}>Hackathon</Text>
                  </Flex>
                </Flex>
                <Flex justifyContent={"space-between"}>
                  <Flex>
                    <IoLocationSharp size={20} color={"blue.400"} />
                    <Text ml={2} fontSize={"sm"}>University of Toronto</Text>
                  </Flex>
                  <Flex>
                    <BsFillPersonCheckFill size={20} />
                    <Text ml={2} fontSize={"sm"} fontWeight={"bold"}>Eligibility: </Text>
                    <Text ml={2} fontSize={"sm"}>Undergraduate</Text>
                  </Flex>
                </Flex>
                <Flex justifyContent={"space-between"} alignItems={"center"}>
                  <Flex>
                    <Text fontSize={"sm"} fontWeight={"bold"}>Registration Deadline: </Text>
                    <Text ml={2} fontSize={"sm"}>May 30, 2022</Text>
                  </Flex>
                  <Flex>
                    <Button size={"sm"} fontSize={"sm"} ml={2} as={routerLink} to={"https://hackthenorth.com/"} target={"_blank"}> Link</Button>
                  </Flex>
                </Flex>
                <Flex mb={2}>
                  <Flex mr={4}>
                    <IoCalendarOutline size={20} color={"blue.400"} />
                    <Text ml={2} fontSize={"sm"}>May 30, 2022</Text>
                  </Flex>
                  <Flex>
                    <IoTimeOutline size={20} />
                    <Text ml={2} fontSize={"sm"}>8:00 AM EDT</Text>
                  </Flex>
                </Flex> 
                <Flex bg={useColorModeValue("gray.100", "#313131")} flexDirection={"column"} p={2} borderRadius={"md"}>
                  <Text fontSize={"sm"} fontWeight={"bold"}>Description</Text>
                  <Text fontSize={"sm"} mt={2}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quia.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quia.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quia.
                  </Text>
                </Flex>
            </Flex>
            <Flex justifyContent={"flex-end"} mt={2} alignItems={"center"}>
              <Text ml={2} fontSize={"sm"}>John Doe</Text>
              <Avatar size={"sm"} ml={2} name='John Doe' src='https://bit.ly/dan-abramov' />
            </Flex>
        </Box>
    </>
  )
}

export default Event