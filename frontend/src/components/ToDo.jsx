import React from "react";
import { Flex, Text, Button, Box, Checkbox } from "@chakra-ui/react";
import { BsCoin } from "react-icons/bs";
import { useColorModeValue } from "@chakra-ui/react";
import { DeleteIcon } from '@chakra-ui/icons'
import useShowToast from "../hooks/useShowToast";


const ToDo = ({ task, onTaskUpdate, onTaskDelete }) => {
  const showToast = useShowToast();

  const handleDeleteTask = async() => {
    try {
      const response = await fetch(`api/tasks/${task._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })

      const data = await response.json();
      if (data.error) {
        showToast("Error", data.error, "error");
        return;
      }

      onTaskDelete(task._id);
      showToast("Success", "Task deleted successfully", "success");

    } catch (error) {
      showToast("Error", error.message, "error");
    }
  }

  return (
    <Flex
      alignItems="center"
      justifyContent="space-between"
      p={3}
      bg={useColorModeValue("gray.100", "#313131")}
      borderRadius="md"
      boxShadow="sm"
      w="full"
    >
      {/* Left Section: Task Info */}
      <Flex flexDirection={"row"} gap={4} >
        <Checkbox />
        <Flex flexDirection={"column"}>
            <Text fontSize="md" fontWeight="bold">
                {task.title}
            </Text>
            <Text fontSize="sm" color={task.status === "Completed" ? "green.500" : "red.500"}>
                {task.status}
            </Text>
        </Flex>
        
      </Flex>

      {/* Right Section: Reward Button */}
      <Flex flexDirection={"row"} gap={4} alignItems={"center"}>
        <Button
          colorScheme={task.status === "Completed" ? "green" : "gray"}
          isDisabled={!task.status}
          rightIcon={<BsCoin />}
          size="sm"
        >
          {task.status ? `Collect ${task.reward}` : `Collect ${task.reward}`}
        </Button>
        <DeleteIcon cursor={"pointer"} size={20} onClick={handleDeleteTask} />
      </Flex>
    </Flex>
  );
};

export default ToDo;
