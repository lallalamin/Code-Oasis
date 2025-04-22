import React from 'react'
import { Flex, Text, Image } from '@chakra-ui/react'
import { useColorModeValue } from '@chakra-ui/react';
import { Link as routerLink } from 'react-router-dom'

const New = ({news}) => {
  const formattedDate = new Date(news.date).toLocaleString('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  return (
    <Flex flexDirection={"row"} justifyContent="center" as={routerLink} to={news.url} target="_blank" >
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
          <Text fontSize={"sm"} color={useColorModeValue("gray.light", "gray.500")}>{formattedDate}</Text>
        </Flex>
        <Text fontSize={"lg"} fontWeight={"bold"}>{news.title}</Text>
      </Flex>
    </Flex>
  )
}

export default New