import React from "react";
import { Avatar, Box, Flex, Text, VStack } from "@chakra-ui/react";

const Reply = ({ reply }) => {
  // Ensure reply is an array and render each reply
  if (!reply || !Array.isArray(reply) || reply.length === 0) {
    return null; // Return nothing if there are no replies
  }

  return (
    <VStack spacing={4} align="start" mb={4}>
      {reply.map((item) => (
        <Flex key={item._id} align="start" w="100%" ml={10}>
          <Avatar src={item.userProfilePic} size="sm" mr={4} />
          <Box flex={1} >
            <Text fontWeight="bold">{item.username}</Text>
            <Text fontSize="sm" color="gray.600" p={2}>
              {item.text}
            </Text>
          </Box>
        </Flex>
      ))}
    </VStack>
  );
};

export default Reply;
