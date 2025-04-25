import React from 'react'
import { Flex, Text, Button, Box, Avatar, Image, Link} from '@chakra-ui/react'
import { useColorMode } from '@chakra-ui/react';
import { color } from 'framer-motion';
import { useColorModeValue } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { LogoLinkedinIcon } from 'chakra-ui-ionicons';
import { LogoInstagramIcon } from 'chakra-ui-ionicons';
import { FaDiscord } from "react-icons/fa";

const UserBadgeCard = () => {
    const { colorMode } = useColorMode();
  return (
    <>
    <Flex flexDirection={"column"} alignItems={"center"} justifyContent={"center"}>
        <Box 
            w={"20px"}
            h={"20px"}
            bg="#f4a258"
            boxShadow="0px 0px 15px rgba(0,0,0,0.09)"
            justifyContent={"center"}>
        </Box>
        <Box w="100%" 
            maxW="280px" 
            h="auto" 
            bg="rgba(255, 255, 255, 0.1)"
            boxShadow="0px 0px 15px rgba(0,0,0,0.09)"
            p="4"
            borderRadius="lg"
            mb={4}>
                <Flex justifyContent={"center"} alignItems={"center"} flexDirection={"column"}>
                    <Flex bg={colorMode === "dark" ? "gray.dark" : "gray.200"}
                    boxShadow={colorMode === "dark" ? "0px 0px 15px rgba(0,0,0,0.09)" : "0px 0px 15px rgba(255,255,255,0.7)"}
                    p="2"
                    borderRadius="full"
                    mb={4}
                    w="50px"/> 
                </Flex>
                <Flex flexDirection={"column"} gap={2}>
                    <Flex align="center" gap={4} mb={4}>
                        <Avatar size="lg" name="Kent Dodds" src="https://bit.ly/kent-c-dodds" />
                        <Box>
                            <Text fontSize="xs" color="gray.400">Team # Ricky</Text>
                            <Text fontSize="md" fontWeight="bold" color={useColorModeValue("gray.800", "whiteAlpha.900")}>Kent Dodds</Text>
                            <Text fontSize="sm" color="gray.500">Sophomore</Text>
                        </Box>
                    </Flex>
                    <Flex flexDirection={"column"} >
                        <Text fontSize={"xs"} fontWeight={"bold"} >Looking For Help With...</Text>
                    </Flex> 
                    <Flex w={"full"} bg={colorMode === "dark" ? "gray.dark" : "gray.200"} p={4} borderRadius={"md"}>
                        <Text fontSize={"xs"}>I looking for a mentor to help me learn web development. Help me to become a full-stack developer. I am a beginner in web development.</Text>
                    </Flex>
                    
                    <Flex w={"full"} flexDirection={"column"}>
                        <Flex flexDirection={"column"} mb={2}>
                            <Text fontSize={"xs"} fontWeight={"bold"} mb={1}>Hobbies & Interests</Text>
                        </Flex> 
                        <Flex gap={2} justifyContent={"space-between"} w={"full"}>
                            <Flex flexDirection={"column"}borderRadius={"lg"} justifyContent={"space-between"} bg={useColorModeValue("gray.200", "gray.dark")} alignItems={"center"} px={3} py={2} w={"full"}>
                                <Text fontSize={"xs"} fontWeight={"bold"}>Crochet</Text>
                                <Image src="/interest-icon/crochet.png" w={"25px"} borderRadius={"md"}/>
                            </Flex>
                            <Flex flexDirection={"column"}borderRadius={"lg"} justifyContent={"space-between"} bg={useColorModeValue("gray.200", "gray.dark")} alignItems={"center"} px={3} py={2} w={"full"}>
                                <Text fontSize={"xs"} fontWeight={"bold"}>Anime</Text>
                                <Image src="/interest-icon/anime.png" w={"25px"} borderRadius={"md"}/>
                            </Flex>
                            <Flex flexDirection={"column"}borderRadius={"lg"} justifyContent={"space-between"} bg={useColorModeValue("gray.200", "gray.dark")} alignItems={"center"} px={3} py={2} w={"full"}>
                                <Text fontSize={"xs"} fontWeight={"bold"}>Drawing</Text>
                                <Image src="/interest-icon/father.png" w={"25px"} borderRadius={"md"}/>
                            </Flex>
                        </Flex>
                    </Flex>

                    <Button size={"xs"} borderRadius={"full"} colorScheme='yellow'>Enter the Chat Terminal &#8250;_</Button>
                </Flex>
        </Box>
    </Flex>

    </>
  )
}

export default UserBadgeCard