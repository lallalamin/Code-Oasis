import React from 'react'
import { Text, Divider, Input, Button, Flex, Image, Skeleton, SkeletonCircle, Box } from '@chakra-ui/react'
import { InformationCircleOutlineIcon } from 'chakra-ui-ionicons';
import { HelpCircleOutlineIcon } from 'chakra-ui-ionicons';
import { useColorModeValue } from '@chakra-ui/react';
import GlobalCalendar from '../components/GlobalCalendar'

const EventPage = () => {
  return (
    <>
      <Text fontSize="2xl" fontWeight="bold" my={1}>
          Events Calendar
      </Text>
      <Divider my={4} />
      

      <Box position={"relative"} left={"50%"} w={{lg:"800px", md:"80%", base:"100%"}} transform={"translateX(-50%)"}  p={4} flex={1} overflow={"auto"}>
        <Flex gap={4} flexDirection={{base:"column", md:"row"}} maxW={{sm:"400px", md:"full"}} mx={"auto"}>
            <GlobalCalendar/>
            <Flex flex={30} gap={2} flexDirection={"column"} maxW={{sm:"250px", md:"full"}} mx={"auto"}>
                <Text fontWeight={700} color={useColorModeValue("gray.600", "gray.400")}>
                    Events
                </Text>
                
                {(
                    [0,1,2,3,4].map((_, i) => (
                        <Flex key={i} gap={4} alignItems={"center"} p={"1"} borderRadius={"md"}>
                            <Box>
                                <SkeletonCircle size='10' />
                            </Box>
                            <Flex w={"full"} flexDirection={"column"} gap={3}>
                                <Skeleton h={"10px"} w={"80px"}/>
                                <Skeleton h={"8px"} w={"80%"} />
                            </Flex>
                        </Flex>
                    ))
                )}
            </Flex>
            {/* {!selectedConversation._id && (
                <Flex flex={70} borderRadius={"md"} p={2} flexDir={"column"} alignItems={"center"} justifyContent={"center"} height={"400px"}>
                    <Text fontSize={20} fontWeight={"bold"}>Select a conversation to start messaging</Text>
                    <Image src="/characters/Ricky-NoChat.png" alt='post image' w={"300px"} />
                </Flex>
            )}

            {selectedConversation._id && <MessageContainer/>} */}
            
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