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
    const [streak, setStreak] = useState(user?.streakCount);
    const [xp, setXp] = useState(user?.xp);
    const [timeLeft, setTimeLeft] = useState(useTimeUntilNextDay());
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
                setTasks(data);
                console.log(data);

            } catch (error) {
                showToast("Error", error, "error");
            }
        }
        fetchTasks();
    }, [user])

    useEffect(() => {
        const interval = setInterval(() => {
            const updatedTIme = useTimeUntilNextDay();
            setTimeLeft(updatedTIme);

            if(updatedTIme.hours === 0 && updatedTIme.minutes === 0 && updatedTIme.seconds === 0) {
                resetTasksForNewDay();
            }
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const resetTasksForNewDay = async () => {
        try {
            const response = await fetch(`/api/tasks/reset`, {
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

            setStreak(data.streak);
        } catch (error) {
            showToast("Error", error, "error");
        }
    }
    

    const handleTaskAdd = (newTask) => {
        setTasks((prevTasks) => [...prevTasks, newTask]);
        console.log("updated tasks:", tasks);
    };

    const handleTaskUpdate = (taskId, updatedTask) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task._id === taskId ? { ...task, ...updatedTask } : task
            )
        );
    };

    const handleTaskDelete = (taskId) => {
        setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
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
                        <Flex flexDirection={"row"} alignItems="center" gap={1}>
                            <HiOutlineFire size={20} color={streak > 0 ? "#ea580c" : "gray"} /> 
                            <Text fontSize="lg" fontWeight="bold" >
                                {streak} 
                            </Text>
                        </Flex>
                    <AddTaskModal onTaskAdd={handleTaskAdd} />
                    </Flex>
                </Flex>
                <Flex
                    justifyContent="space-between"
                    alignItems="center"
                    p={3}
                    borderRadius="md"
                >
                    <Text fontSize="sm" >
                        Time Until Next Day
                    </Text>
                    <Flex gap={3}>
                        <Text fontSize="sm">
                        {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
                        </Text>
                    </Flex>
                </Flex>

                <Divider />

                <Flex flex={1} flexDirection={"column"} gap={2} py={2}  w={"full"} overflowY={"scroll"}>
                    <Flex flexDirection="column" gap={4}>
                        {tasks.length === 0 ? (
                            <Flex alignItems="center" justifyContent="center" h="100%" w="100%">
                                <Text fontSize="md" color="gray.500">
                                    No tasks. Add your first task!
                                </Text>
                            </Flex>
                        ) : (
                            tasks.map((task) => (
                                <ToDo key={task._id} task={task} onTaskUpdate={handleTaskUpdate} onTaskDelete={handleTaskDelete} />
                            ))
                        )}
                    </Flex>
                </Flex>
            </Flex>
                )}
    
    </>
  )
}

const useTimeUntilNextDay = () => {
  const now = new Date();
  const nextMidnight = new Date(now);
  nextMidnight.setDate(now.getDate() + 1);
  nextMidnight.setHours(0, 0, 0, 0);

  const diff = nextMidnight - now;

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return { hours, minutes, seconds };
};

export default ToDoContainer
