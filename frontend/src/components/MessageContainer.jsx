import React from 'react'
import { Flex, useColorModeValue, Avatar, Divider } from '@chakra-ui/react'

const MessageContainer = () => {
  return (
    <Flex flex={70} bg={useColorModeValue("gray.200", "gray.dark")} borderRadius={"md"} p={2} flexDirection={"column"}> 
        {/* <Flex flex={70}>MessageContainer</Flex> */}
        <Flex w={"full"} h={12} alignItems={"center"} gap={2}>
            <Avatar size={"sm"} src='/zuck-avatar.png'></Avatar>
            <Text fontSize={"sm"} fontWeight={"bold"}>
              markzuckerberg
              <Image src='/verified.png' w={4} h={4} ml={1}/>
            </Text>
        </Flex>
        <Divider/>
    </Flex>
    
  )
}

export default MessageContainer