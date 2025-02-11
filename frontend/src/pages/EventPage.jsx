import React from 'react'
import { Text, Divider, Input, Button, Flex, Image, Skeleton, SkeletonCircle, Box } from '@chakra-ui/react'
import { InformationCircleOutlineIcon } from 'chakra-ui-ionicons';
import { HelpCircleOutlineIcon } from 'chakra-ui-ionicons';
import { useColorModeValue } from '@chakra-ui/react';
import GlobalCalendar from '../components/GlobalCalendar'
import { useState } from 'react';
import Event from '../components/Event';


const EventPage = () => {
  const [loading, setLoading] = useState(true);
  const [eventListLoading, setEventListLoading] = useState(false);

  return (
    <>
      <Text fontSize="2xl" fontWeight="bold" my={1}>
          Events Calendar
      </Text>
      <Divider my={4} />

      <Box>
        <Flex gap={2} flexDirection={{base:"column", md:"row"}} maxW={{sm:"400px", md:"full"}} mx={"auto"} >
            <Flex flex={70} >
                <GlobalCalendar/>
            </Flex>
            <Flex flex={30} gap={2} flexDirection={"column"} maxW={{sm:"250px", md:"full"}} mx={"auto"}>
              <Text fontWeight={700} color={useColorModeValue("gray.600", "gray.400")}>
                    Your Added Events
                </Text>
                <Divider/>
                {loading && (
                    [0,1,2].map((_, i) => (
                        <Flex key={i} gap={4} alignItems={"center"} p={"1"} borderRadius={"md"}>
                          <Skeleton h={"100px"} w={"full"}/>
                        </Flex>
                    ))
                )}
            </Flex>
        </Flex>
        <Flex flexDirection={"column"}>
          <Box mt={5}>
            <Text fontSize="xl" fontWeight="bold" >
              📆 May 25, 2025 | Events & Activities
            </Text>
            <Text fontSize="sm" color={useColorModeValue("gray.600", "gray.400")}>Select other date to see events and activities</Text>
          </Box>
          <Divider my={4} />
          {eventListLoading && (
            [0,1,2].map((_, i) => (
              <Flex key={i} gap={4} alignItems={"center"} p={"1"} borderRadius={"md"} mb={2}>
                <Skeleton h={"150px"} w={"full"}/>
                <Skeleton h={"150px"} w={"full"}/>
              </Flex>
            ))
          )}
          {!eventListLoading && (
            <Event></Event>
          )}
        </Flex>
      </Box>
      

      
    </>
  )
}

export default EventPage

{/* <form onSubmit={handleConversationSearch}>
  <Flex alignItems={"center"} gap={2}>
      <Input placeholder='Search for a user...' onChange={(e) => setSearchText(e.target.value)} />
      <Button size={"sm"} onClick={handleConversationSearch} isLoading={searchingUser}>
          <SearchIcon/>
      </Button>
  </Flex>
</form> */}