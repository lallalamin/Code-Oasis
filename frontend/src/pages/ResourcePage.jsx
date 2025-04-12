import React from 'react'
import { Flex, Text } from '@chakra-ui/react'
import { useColorModeValue } from '@chakra-ui/react';

const ResourcePage = () => {
  return (
    <Flex direction="column" alignItems={"center"} justifyContent="center">
        <Text fontSize={"2xl"} fontWeight={"bold"} mb={8}>Resource Bank</Text>
        <Text fontSize={"md"} color={useColorModeValue("gray.600", "gray.400")}>Resource Bank is coming soon...</Text>
    </Flex>
  )
}

export default ResourcePage