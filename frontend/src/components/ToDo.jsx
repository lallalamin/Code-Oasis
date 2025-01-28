import React from "react";
import { Flex, Text, Button, Box, Checkbox } from "@chakra-ui/react";
import { BsCoin } from "react-icons/bs";
import { useColorModeValue } from "@chakra-ui/react";


const ToDo = ({ title, status, reward, completed }) => {
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
                {title}
            </Text>
            <Text fontSize="sm" color={completed ? "green.500" : "red.500"}>
                {status}
            </Text>
        </Flex>
        
      </Flex>

      {/* Right Section: Reward Button */}
      <Button
        colorScheme={completed ? "green" : "gray"}
        isDisabled={!completed}
        rightIcon={<BsCoin />}
        size="sm"
      >
        {completed ? `Collect ${reward}` : `Collect ${reward}`}
      </Button>
    </Flex>
  );
};

export default ToDo;
