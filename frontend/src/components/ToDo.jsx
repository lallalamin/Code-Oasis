import React from "react";
import { Flex, Text, Button, Box, Checkbox } from "@chakra-ui/react";
import { SiExpensify } from "react-icons/si";
import { useColorModeValue } from "@chakra-ui/react";
import { DeleteIcon } from '@chakra-ui/icons'
import useShowToast from "../hooks/useShowToast";
import useConfirmToast from "../hooks/useConfirmToast.jsx";
import { useState } from "react";


const ToDo = ({ task, onTaskUpdate, onTaskDelete }) => {
  const showToast = useShowToast();
  const confirmToast = useConfirmToast();
  const [status, setStatus] = useState(task.status);

  const handleCompleteTask = async () => {
    confirmToast(
      "Mark Task as Completed",
      "Are you sure you've completed this task? This action cannot be undone.",
      async () => {
        try {
          const response = await fetch(`/api/tasks/complete/${task._id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
          });

          const data = await response.json();
          if (data.error) {
            showToast("Error", data.error, "error");
            return;
          }

          setStatus("completed");
          onTaskUpdate(task._id, { status: "completed" });
          showToast("Success", "Task marked as completed", "success");
        } catch (error) {
          showToast("Error", error.message, "error");
        }
      },
    );
  };

  const handleDeleteTask = async() => {
    try {
      console.log("Task ID to delete:", task._id);
      const response = await fetch(`/api/tasks/${task._id}`, {
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
        <Flex flexDirection={"column"}>
            <Text fontSize="md" fontWeight="bold">
                {task.title}
            </Text>
            <Text fontSize="sm" color={status === "completed" ? "green.500" : "red.500"}>
                {status}
            </Text>
        </Flex>
        
      </Flex>

      {/* Right Section: Reward Button */}
      <Flex flexDirection={"row"} gap={4} alignItems={"center"}>
        <Button
          colorScheme={status === "completed" ? "green" : "gray"}
          isDisabled={status === "completed"}
          rightIcon={<SiExpensify />}
          onClick={handleCompleteTask}
          size="sm"
        >
          {status === "completed" ? `Collected ${task.reward}` : `Complete & Collect ${task.reward}`}
        </Button>
        <DeleteIcon cursor={"pointer"} size={20} onClick={handleDeleteTask} />
      </Flex>
    </Flex>
  );
};

export default ToDo;
