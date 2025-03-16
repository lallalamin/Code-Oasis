import React from 'react'
import { Flex, Text, Image, SimpleGrid } from '@chakra-ui/react'
import New from '../components/New'

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
      </Flex>
    </>
  )
}

export default NewsPage