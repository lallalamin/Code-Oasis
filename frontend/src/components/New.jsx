import React from 'react'
import { Flex, Text, Image } from '@chakra-ui/react'
import { useColorModeValue } from '@chakra-ui/react';

const New = ({news}) => {
  return (
    <Flex flexDirection={"column"} justifyContent="center" >
      
      <Flex gap={2} flexDirection={"row"} justifyContent={"space-between"} w={"full"}> 
        <Text fontSize={"sm"} color={useColorModeValue("gray.light", "gray.500")}>{news.author}</Text>
        <Text fontSize={"sm"} color={useColorModeValue("gray.light", "gray.500")}>{news.date}</Text>
      </Flex>
      <Text fontSize={"lg"} fontWeight={"bold"}>{news.title}</Text>
      <Image src={news.image} mb={2}  />
    </Flex>
  )
}

export default New