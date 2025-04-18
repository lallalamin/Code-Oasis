import React from 'react'
import { Flex, Text, Image } from '@chakra-ui/react'
import { useColorModeValue } from '@chakra-ui/react';

const New = ({news}) => {
  return (
    <Flex flexDirection={"row"} justifyContent="center" >
      <Image src={news.image}
        h="200px"
        w="300px"
        objectFit="cover"
        flexShrink={0} // prevent image from shrinking
        borderRadius="md"
        mr={4}
      />
      <Flex flexDirection={"column"} maxW="500px">
        <Flex gap={2} flexDirection={"row"} justifyContent={"space-between"} w={"full"}> 
          <Text fontSize={"sm"} color={useColorModeValue("gray.light", "gray.500")}>{news.author}</Text>
          <Text fontSize={"sm"} color={useColorModeValue("gray.light", "gray.500")}>{news.date}</Text>
        </Flex>
        <Text fontSize={"lg"} fontWeight={"bold"}>{news.title}</Text>
      </Flex>
    </Flex>
  )
}

export default New