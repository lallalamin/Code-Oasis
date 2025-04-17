import React from 'react'
import { Flex, Text, Image } from '@chakra-ui/react'
import { useColorModeValue } from '@chakra-ui/react';

const New = () => {
  return (
    <Flex flexDirection={"column"} justifyContent="center" >
      
      <Flex gap={2} flexDirection={"row"} justifyContent={"space-between"} w={"full"}> 
        <Text fontSize={"sm"} color={useColorModeValue("gray.light", "gray.500")}>John Doe</Text>
        <Text fontSize={"sm"} color={useColorModeValue("gray.light", "gray.500")}>May 25, 2025</Text>
      </Flex>
      <Text fontSize={"xl"} fontWeight={"bold"}>Title of the news</Text>
      <Image src="https://placehold.co/600x400" mb={2} />
    </Flex>
  )
}

export default New