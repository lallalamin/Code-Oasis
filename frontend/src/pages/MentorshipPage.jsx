import React from 'react'
import { Flex, Text } from '@chakra-ui/react'
import { useColorModeValue } from '@chakra-ui/react';

const MentorshipPage = () => {
  return (
    <Flex direction="column" alignItems={"center"} justifyContent="center">
        <Text fontSize={"2xl"} fontWeight={"bold"} mb={8}>Mentorship Portal</Text>
        <Text fontSize={"md"} color={useColorModeValue("gray.600", "gray.400")}>Mentorship Program is coming soon...</Text>
    </Flex>
  )
}

export default MentorshipPage