import React, { useState } from 'react'
import { Flex, Text, Skeleton, SkeletonCircle, Box } from '@chakra-ui/react'
import SuggestedUser from './SuggestedUser';

const SuggestedUsers = () => {
    const [loading, setLoading] = useState(false);
    const [suggestedUsers, setSuggestedUsers] = useState([]);
  return (
    <div>
        <Text mb={4} fontWeight={"bold"}>
            Suggested Users
        </Text>
        <Flex direction={"column"} gap={4}>
            {!loading && [0, 1, 2, 3, 4].map(user => <SuggestedUser key={user._id} user={user} />)}

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
        </Flex>
    </div>
  )
}

export default SuggestedUsers

{/* <Flex key={idx} gap={2} alignItems={"center"} p={"1"} borderRadius={"md"}>
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
</Flex> */}