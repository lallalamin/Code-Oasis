import React from 'react'
import { Text, Divider, Button, Flex } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'

const MiniLeaderboard = () => {
  return (
    <>
        <Flex justifyContent={"space-between"} alignItems={"center"}>
            <Text fontSize={"2xl"} fontWeight={"bold"}>Leaderboard</Text>
            <Button size={"sm"} mt={2} ml={"auto"} as={RouterLink} to={`/leaderboard`}>View More</Button>
        </Flex>
        <Divider my={4}/>
    </>
  )
}

export default MiniLeaderboard