import React, { useEffect } from 'react'
import ToDo from '../components/ToDo'
import { Flex, Text, Image, Divider, Spinner, Button } from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/react";
import { FaChartBar, FaPlus } from "react-icons/fa";
import { FaPen } from "react-icons/fa";
import { useRecoilValue } from 'recoil'
import userAtom from '../atoms/userAtom'
import { useState } from 'react'
import { HiOutlineFire } from "react-icons/hi";
import useShowToast from '../hooks/useShowToast';
import AddTaskModal from '../components/AddTaskModal';

const ToDoContainer = ({user}) => {
    const currentUser = useRecoilValue(userAtom);
    const [tasks, setTasks] = useState([]);
    const showToast = useShowToast();

    useEffect(() => {
        const fetchTasks = async () => {
            if (!user || !currentUser) return;
            if (user._id !== currentUser._id) return;

            try {
                const response = await fetch(`/api/tasks/${user._id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const data = await response.json();
                if (data.error) {
                    console.error(data.error);
                    return;
                }
                setTasks(data.tasks);
                console.log(data);

            } catch (error) {
                showToast("Error", error, "error");
            }
        }
        fetchTasks();
    }, [user])

    const handleTaskAdd = (newTask) => {
        setTasks((prevTasks) => [...prevTasks, newTask]);
    };

    const handleTaskUpdate = (taskId, updatedTask) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task._id === taskId ? { ...task, ...updatedTask } : task
            )
        );
    };

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
                    <HiOutlineFire size={32} color="red" />
                    <AddTaskModal />
                    </Flex>
                </Flex>

                <Divider />

                <Flex flex={1} flexDirection={"column"} gap={2} py={2} my={2} w={"full"} overflowY={"scroll"}>
                    <Flex flexDirection="column" gap={4}>
                        {tasks === undefined ? (
                            <Flex alignItems="center" justifyContent="center" h="100%" w="100%">
                                <Text fontSize="md" color="gray.500">
                                No tasks found.
                                </Text>
                            </Flex>
                        ) : (
                            tasks.map((task) => (
                                <ToDo key={task._id} task={task} onTaskUpdate={handleTaskUpdate} />
                            ))
                        )}
                    </Flex>
                </Flex>
            </Flex>
                )}
    
    </>
  )
}

export default ToDoContainer
