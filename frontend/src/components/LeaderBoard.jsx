import React, { useEffect, useState } from 'react'
import { Flex, Text, Skeleton, SkeletonCircle, Box, Divider } from '@chakra-ui/react'
import SuggestedUser from './SuggestedUser';
import useShowToast from '../hooks/useShowToast';

const LeaderBoard = () => {
    const [loading, setLoading] = useState(true);
    const [suggestedUsers, setSuggestedUsers] = useState([]);
    const showToast = useShowToast();

    useEffect(() => {
        const getSuggestedUsers = async() => {
            setLoading(true);
            try {
                const res = await fetch("/api/users/suggested");
                const data = await res.json();

                if(data.error) {
                    showToast("Error", data.error, "error");
                    return;
                }
                console.log("data", data);
                console.log("suggestedUsers", suggestedUsers);

                setSuggestedUsers(data.suggestedUsers);

            } catch (error) {
                showToast("Error", error.message, "error");
            } finally {
                setLoading(false);
            }
        }

        getSuggestedUsers();
    }, [showToast]);

  return (
    <div>
        <Text fontSize={"2xl"} fontWeight={"bold"} my={1}>LeaderBoard</Text>
        <Divider my={4}/>

        {/* <Flex direction={"column"} gap={4}>
            {!loading && suggestedUsers.map((user) => <SuggestedUser key={user._id} user={user} />)}

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