import React from 'react'
import { Flex, Text, Box } from '@chakra-ui/react'
import { useColorModeValue } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';

const AboutPage = () => {
    const location = useLocation();
    const isAboutPage = location.pathname === "/about";
  return (
    <Box className='landing-page' w="100%" position={"relative"} minH="100vh" p={4}>
      {isAboutPage && (
      <Box className="gradient-bg" top="0" left="0" w="100%" h="100%" zIndex="-1">
        <div className="gradients-container">
          <div className="g1"></div>
          <div className="g2"></div>
          <div className="g3"></div>
          <div className="g4"></div>
          <div className="g5"></div>
        </div>
      </Box>
        )}
        <Flex direction="column" alignItems={"center"} justifyContent="center">
            <Text fontSize={"2xl"} fontWeight={"bold"} mb={8}>🌱 About CodeOasis</Text>
            <Text fontSize={"md"} color={useColorModeValue("gray.600", "gray.400")}>
                CodeOasis began as more than just a project—it started with a feeling.
            </Text>
            <Text fontSize={"md"} color={useColorModeValue("gray.600", "gray.400")}>To be continue...</Text>
        </Flex>
    </Box>
    
  )
}

export default AboutPage