import React, { useEffect, useState } from 'react'
import { Flex, Text, Image, SimpleGrid, Box } from '@chakra-ui/react'
import New from '../components/New'
import { useColorModeValue } from '@chakra-ui/react';

const NewsPage = () => {
  const [allNews, setAllNews] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getNews = async() => {
      const res = await fetch("/api/technews/news", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if(data.error) {
        console.error(data.error);
        return;
      };

      console.log(data);
      setAllNews(data);
    }

    getNews();
  })

  return (
    <>
      <Flex direction="column" alignItems={"center"} justifyContent="center">
          <Text fontSize={"2xl"} fontWeight={"bold"} mb={8}>News Feed</Text>
          <Box w="full"
            bg="rgba(255, 255, 255, 0.1)"
            boxShadow="0px 0px 15px rgba(0,0,0,0.09)"
            p="6"
            borderRadius="lg"
            mb={8}
            >
            <Text fontSize={"md"} fontWeight={"bold"} mb={2}>
              📰 Hugo&apos;s been busy! He collected tech news from website for you!
            </Text>
            <Text fontSize={"sm"} color={useColorModeValue("gray.600", "gray.400")}>
              Articles come from amazing sites like TechCrunch and VentureBeat — we don&apos;t own them, we&apos;re just sharing what&apos;s cool.
              Click through to read the full stories on their original sites!
            </Text>
          </Box>
          <SimpleGrid columns={{base: 1, md: 1}} spacing={5}>
            {allNews.map((news) => (
              <New key={news._id} news={news} />
            ))}
          </SimpleGrid>
      </Flex>
    </>
  )
}

export default NewsPage