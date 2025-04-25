import React from 'react'
import { Flex, Text, Avatar, AvatarBadge, Stack, Button, Box, Heading } from '@chakra-ui/react'
import { useColorMode } from '@chakra-ui/react';
import UserBadgeCard from './UserBadgeCard';
import { useColorModeValue } from '@chakra-ui/react';

const FindMentorTab = () => {
    const { colorMode } = useColorMode();
  return (
    <>
    <Flex flexDirection={"row"} justifyContent={"space-between"} w={"full"} mb={4} gap={4}>
        <Flex flexDirection={"column"}>
            {/* list of your mentors */}
            <Flex w={"full"} bg={colorMode === "dark" ? "gray.dark" : "gray.200"} p={4} borderRadius={"md"} flexDirection={"column"}>
                <Text fontSize={"sm"} fontWeight={"bold"} mb={3}>Your Mentor</Text>
                <Stack direction="row" spacing={4}>
                    <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov">
                        {/* if the mentor is online, show a green dot */}
                        {/* <AvatarBadge boxSize="1.25em" bg="green.500" /> */}
                    </Avatar>
                    <Avatar name="Kent Dodds" src="https://bit.ly/kent-c-dodds"></Avatar>
                    <Avatar name="Ryan Florence" src="https://bit.ly/ryan-florence"></Avatar>
                    <Avatar name="Prosper Otemuyiwa" src="https://bit.ly/prosper-baba" ></Avatar>
                </Stack>
            </Flex>
            {/* button to redirect to the starter guide */}
            <Flex  w={"full"} bg={colorMode === "dark" ? "gray.dark" : "gray.200"} p={4} borderRadius={"md"} flexDirection={"column"} mt={4} alignItems={"center"} justifyContent={"center"}>
                <Text fontSize={"lg"} fontWeight={"bold"} mb={3}>Don't know where to start?</Text>
                <Button size={"sm"}>Starter Guide</Button>
            </Flex>
        </Flex>
        {/* user badges preview */}
        <Flex  w={"full"} bg={colorMode === "dark" ? "gray.dark" : "gray.200"} p={4} borderRadius={"md"} flexDirection={"column"} >
            <Text fontSize={"lg"} fontWeight={"bold"} mb={3}>Your Badges Preview</Text>
            <UserBadgeCard />
            <Button size={"sm"}>Edit</Button>
        </Flex>

    </Flex>
    
    <Flex flexDirection="column" gap={2} py={2} w="full" bg={colorMode === "dark" ? "gray.dark" : "gray.200"} borderRadius="md" p={4}>
        <Text fontSize="lg" fontWeight="bold" mb={3}>Suggested Mentors</Text>

        <Flex
            flexDirection="row"
            overflowX="auto"
            gap={4}
            pb={2}
            h="480px"
            w="full"
            css={{
            '&::-webkit-scrollbar': { height: '7px' },
            '&::-webkit-scrollbar-thumb': { background: '#aaa', borderRadius: '10px' },
            }}
        >
            {/* Quiz Card */}
            <Box>
               <Flex flexDirection="column" alignItems="center" justifyContent="center">
                    <Box w="20px" h="20px" bg="#f4a258" boxShadow="0px 0px 15px rgba(0,0,0,0.09)" justifyContent="center" />
                    <Box w="100%" maxW="280px" h="430px" bg="rgba(255,255,255,0.1)" boxShadow="0px 0px 15px rgba(0,0,0,0.09)" p="4" borderRadius="lg" >
                        <Flex justifyContent="center" alignItems="center" flexDirection="column">
                            <Flex bg={colorMode === "dark" ? "gray.dark" : "gray.200"} boxShadow={colorMode === "dark" ? "0px 0px 15px rgba(0,0,0,0.09)" : "0px 0px 15px rgba(255,255,255,0.7)"} p="2" borderRadius="full" mb={4} w="50px" />
                        </Flex>
                        <Flex flexDirection="column" gap={2}>
                            <Text fontSize="xs" color="gray.400">Let us help you find a mentor</Text>
                            <Text fontSize="md" fontWeight="bold" color={useColorModeValue("gray.800", "whiteAlpha.900")}>Take the quiz to find your perfect match!</Text>
                            <Button size="xs" borderRadius="full" colorScheme="yellow">Take the Quiz!</Button>
                        </Flex>
                    </Box>
                </Flex> 
            </Box>
            

            {/* Suggested Mentor Cards */}
            {[...Array(5)].map((_, i) => (
            <Box key={i}>
                <UserBadgeCard />
            </Box>
            ))}
        </Flex>
    </Flex>
    </>
  )
}

export default FindMentorTab