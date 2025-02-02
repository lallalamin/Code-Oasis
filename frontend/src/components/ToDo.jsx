import React from "react";
import { Flex, Text, Button, Box, Checkbox } from "@chakra-ui/react";
import { BsCoin } from "react-icons/bs";
import { useColorModeValue } from "@chakra-ui/react";


const ToDo = ({ task }) => {
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
      <Button
        colorScheme={task.status === "Completed" ? "green" : "gray"}
        isDisabled={!task.status}
        rightIcon={<BsCoin />}
        size="sm"
      >
        {task.status ? `Collect ${task.reward}` : `Collect ${task.reward}`}
      </Button>
    </Flex>
  );
};

export default ToDo;
