import React from 'react'
import { Flex, Text, Button, Box} from '@chakra-ui/react'
import { useColorMode } from '@chakra-ui/react';

const UserBadgeCard = () => {
    const { colorMode } = useColorMode();
  return (
    <>
    <Flex  w={"full"} bg={colorMode === "dark" ? "gray.dark" : "gray.200"} p={4} borderRadius={"md"} flexDirection={"column"} >
        <Text fontSize={"lg"} fontWeight={"bold"} mb={3}>Your Badges Preview</Text>
        <Box bg="rgba(255, 255, 255, 0.1)"
            boxShadow="0px 0px 15px rgba(0,0,0,0.09)"
            p="6"
            borderRadius="lg"
            mb={4}>

        </Box>
        <Button size={"sm"}>Edit</Button>
    </Flex>
    </>
  )
}

export default UserBadgeCard