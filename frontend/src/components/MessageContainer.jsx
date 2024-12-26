import React from 'react'
import { Flex, useColorModeValue, Avatar, Divider, SkeletonCircle, Text, Image, Skeleton } from '@chakra-ui/react'

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
        <Flex flexDir={"column"} gap={4} my={4} height={"400px"} overflowY={"scroll"}>
          {true &&([...Array(5)].map((_, i) => (
            <Flex key={i} gap={2} alignItems={"center"} p={1} borderRadius={"md"} alignSelf={i % 2 === 0 ? "flex-start" : "flex-end"}>
              {i % 2 === 0 && <SkeletonCircle size={7} />}
              <Flex flexDir={"column"} gap={2}>
                <Skeleton h={"8px"} w={"250px"} />
                <Skeleton h={"8px"} w={"250px"} />
                <Skeleton h={"8px"} w={"250px"} />
              </Flex>
              {i % 2 !== 0 && <SkeletonCircle size={7} />}
            </Flex>
          )))}
        </Flex>
    </Flex>
    
  )
}

export default MessageContainer