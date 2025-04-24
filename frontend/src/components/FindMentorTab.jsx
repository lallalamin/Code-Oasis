import React from 'react'
import { Flex, Text, Avatar, AvatarBadge, Stack, Button } from '@chakra-ui/react'
import { useColorMode } from '@chakra-ui/react';
import UserBadgeCard from './UserBadgeCard';

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
        <UserBadgeCard />
    </Flex>
    </>
  )
}

export default FindMentorTab