import React from 'react'
import { Flex, Text, Image, SimpleGrid, Box } from '@chakra-ui/react'
import New from '../components/New'
import { useColorModeValue } from '@chakra-ui/react';

const NewsPage = () => {
  return (
    <>
      <Flex direction="column" alignItems={"center"} justifyContent="center">
          <Text fontSize={"2xl"} fontWeight={"bold"} mb={8}>Recent News</Text>
          <SimpleGrid columns={{base: 1, md: 2}} spacing={5}>
            <New/>
            <New/>
            <New/>
            <New/>
          </SimpleGrid>
          <Box w="full"
            bg="rgba(255, 255, 255, 0.1)"
            boxShadow="0px 0px 15px rgba(0,0,0,0.09)"
            p="6"
            borderRadius="lg"
            mb={8}
            mt={8}
            >
            <Text fontSize={"md"} fontWeight={"bold"} mb={2}>
              📰 Hugo&apos;s been busy! He collected tech news from website for you!
            </Text>
            <Text fontSize={"sm"} color={useColorModeValue("gray.600", "gray.400")}>
              Articles come from amazing sites like TechCrunch and VentureBeat — we don&apos;t own them, we&apos;re just sharing what&apos;s cool.
              Click through to read the full stories on their original sites!
            </Text>
          </Box>
      </Flex>
    </>
  )
}

export default NewsPage