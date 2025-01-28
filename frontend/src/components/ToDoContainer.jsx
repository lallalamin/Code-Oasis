import React from 'react'
import ToDo from '../components/ToDo'
import { Flex, Text, Image, Divider } from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/react";
import { FaChartBar, FaPlus } from "react-icons/fa";

const ToDoContainer = ({user}) => {
  return (
    <Flex bg={useColorModeValue("gray.200", "gray.dark")} borderRadius={"md"} p={2} flexDirection={"column"} my={6} h={"350px"}>
        <Flex
            justifyContent="space-between"
            alignItems="center"
            bg={useColorModeValue("gray.300", "gray.d00")}
            p={3}
            borderRadius="md"
        >
            <Text fontSize="md" fontWeight="bold">
            Daily Routine Task
            </Text>
            <Flex gap={2}>
            <FaChartBar size={20} />
            <FaPlus size={20} />
            </Flex>
        </Flex>

        <Divider />

        <Flex flex={1} flexDirection={"column"} gap={2} py={2} my={2} w={"full"} overflowY={"scroll"}>
            <Flex flexDirection="column" gap={4}>
                <ToDo
                title="Exercise for 30 mins"
                status="Completed"
                reward="10"
                completed={true}
                />
                <ToDo
                title="1 Leetcode Question"
                status="Need to do!"
                reward="10"
                completed={false}
                />
                <ToDo
                title="Exercise for 30 mins"
                status="Completed"
                reward="10"
                completed={true}
                />
                <ToDo
                title="Exercise for 30 mins"
                status="Completed"
                reward="10"
                completed={true}
                />
                <ToDo
                title="Exercise for 30 mins"
                status="Completed"
                reward="10"
                completed={true}
                />
            </Flex>
        </Flex>
    </Flex>
  )
}

export default ToDoContainer