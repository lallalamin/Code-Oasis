import React, { useEffect, useState } from 'react'
import { Flex, Text, Skeleton, SkeletonCircle, Box, Divider, Image } from '@chakra-ui/react'
import useShowToast from '../hooks/useShowToast';

const LeaderBoard = () => {
    const showToast = useShowToast();


  return (
    <div>
        <Text fontSize={"2xl"} fontWeight={"bold"} my={1}>LeaderBoard</Text>
        <Divider my={4}/>
        <Flex gap={2} flexDirection={"column"}>
            <Image src="/leaderboard/gold-cup.png" alt="Leaderboard" w={"50px"} mb={4} />
            <Image src="/leaderboard/silver-cup.png" alt="Leaderboard" w={"50px"} mb={4} />
            <Image src="/leaderboard/bronze-cup.png" alt="Leaderboard" w={"50px"} mb={4} />
        </Flex>


        {/* <Flex direction={"column"} gap={4}>

            {loading && [0, 1, 2, 3, 4].map((_, idx) => (
                <Flex key={idx} gap={2} alignItems={"center"} p={"1"} borderRadius={"md"}>
                    <Box>
                        <SkeletonCircle size='10' />
                    </Box>
                    <Flex w={"full"} flexDirection={"column"} gap={2}>
                        <Skeleton w={"80px"} h={"8px"} borderRadius={"md"} />
                        <Skeleton w={"90px"} h={"8px"} borderRadius={"md"} />
                    </Flex>
                    <Flex>
                        <Skeleton w={"60px"} h={"20px"} borderRadius={"md"} />
                    </Flex>
                </Flex>
            ))}
        </Flex> */}
    </div>
  )
}

export default LeaderBoard