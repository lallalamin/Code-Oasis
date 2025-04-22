import React from 'react'
import { Flex, Text, Box, Button, Image, Heading } from '@chakra-ui/react'
import { useColorModeValue } from '@chakra-ui/react';

const ResourcePage = () => {
  return (
    <Flex direction="column" alignItems={"center"} justifyContent="center">
        <Text fontSize={"2xl"} fontWeight={"bold"} mb={8}>Resource Bank</Text>
        <Box 
          w="full"
          bg="rgba(255, 255, 255, 0.1)"
          boxShadow="0px 0px 15px rgba(0,0,0,0.09)"
          p="6"
          overflow="hidden"
          borderRadius="lg"
          mb={8}
        >

          {/* Title */}
          <Heading as="h1" fontSize="xl" fontWeight="bold" pb={2}>
            Discover Your Coding Personality
          </Heading>

          {/* Content*/}
          <Flex flexDirection={{ base: "column", md: "row" }} justifyContent={"space-between"} alignItems="center" gap={2} >
            <Image src="/characters/everyone.png" alt="connect" w={"180px"} my={2}/>
            <Flex flexDirection={"column"}>
              <Text fontSize="sm" color={useColorModeValue("gray.600", "gray.400")} lineHeight="1.5" mb={6} textAlign={"center"}>
                Take the CodeOasis quiz to uncover your unique mascot!
              </Text>
              <Button borderRadius={"full"}>Coming Soon!</Button>
            </Flex>
          </Flex>
        </Box>
        <Text fontSize={"md"} color={useColorModeValue("gray.600", "gray.400")}>Resource Bank is coming soon...</Text>
    </Flex>
  )
}

export default ResourcePage