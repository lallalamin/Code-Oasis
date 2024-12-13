import React from 'react'
import { Flex } from '@chakra-ui/react'

const MessageContainer = () => {
  return (
    <Flex flex={70} bg={useColorModeValue("gray.200", "gray.dark")} borderRadius={"md"} flexDirection={"column"}> 
        {/* <Flex flex={70}>MessageContainer</Flex> */}
        <Flex w={"full"} h={12} alignItems={"center"} gap={2}>
          
        </Flex>
    </Flex>
    
  )
}

export default MessageContainer