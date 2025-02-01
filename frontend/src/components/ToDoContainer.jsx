import React, { useEffect } from 'react'
import ToDo from '../components/ToDo'
import { Flex, Text, Image, Divider } from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/react";
import { FaChartBar, FaPlus } from "react-icons/fa";
import { FaPen } from "react-icons/fa";
import { useRecoilValue } from 'recoil'
import userAtom from '../atoms/userAtom'
import { HiOutlineFire } from "react-icons/hi";

const ToDoContainer = ({user}) => {
    const currentUser = useRecoilValue(userAtom);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                
            } catch (error) {
                
            }
        }
    }, [])

  return (
    <>
        {currentUser?._id === user._id && (
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
                    <Flex gap={3}>
                    <HiOutlineFire size={20} color="red" />
                    <FaPen size={15} />
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
                )}
    
    </>
  )
}

export default ToDoContainer
