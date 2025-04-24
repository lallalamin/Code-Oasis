import React from 'react'
import { Flex, Text, Tabs, TabList, TabPanels, TabPanel, Tab } from '@chakra-ui/react'
import { useColorModeValue } from '@chakra-ui/react';
import FindMentorTab from '../components/FindMentorTab';
import FindMenteeTab from '../components/FindMenteeTab';

const MentorshipPage = () => {
  const tabColor = useColorModeValue("gray.600", "gray.400");
  return (
    <Flex direction="column" alignItems={"center"} justifyContent="center">
        <Text fontSize={"2xl"} fontWeight={"bold"} mb={8}>⭐Mentorship Portal⭐</Text>
        {/* <Text fontSize={"md"} color={useColorModeValue("gray.600", "gray.400")}>Mentorship Program is coming soon...</Text> */}
        <Text fontSize={"md"} color={useColorModeValue("gray.600", "gray.400")}>Looking for guidance or eager to guide other?</Text>
        <Text fontSize={"md"} color={useColorModeValue("gray.600", "gray.400")}>Start your mentorship journey here and connect with like-minded individuals!</Text>
        <Tabs isFitted variant="enclosed" mt={4} colorScheme="blue" w={"full"}>
          <TabList mb="1em">
            <Tab >Find a Mentor</Tab>
            <Tab >Become a Mentor</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <FindMentorTab />
            </TabPanel>
            <TabPanel>
              <FindMenteeTab />
            </TabPanel>
          </TabPanels>
        </Tabs>
    </Flex>
  )
}

export default MentorshipPage