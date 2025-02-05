import React from 'react'
import { Text, Divider, Button, Flex, Skeleton, SkeletonCircle, Avatar, Box } from '@chakra-ui/react'
import { Link as routerLink } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import userAtom from '../atoms/userAtom'
import useShowToast from '../hooks/useShowToast'
import { useState, useEffect } from 'react'
import { useColorModeValue } from "@chakra-ui/react";




const MiniLeaderboard = () => {
    const [userRankData, setUserRankData] = useState([]);
    const [currentUserRank, setCurrentUserRank] = useState(null);
    const [loading, setLoading] = useState(true);
    const showToast = useShowToast();
    const currentUser = useRecoilValue(userAtom);
    const userBG = useColorModeValue("gray.200", "gray.dark")

    useEffect(() => {
            const fetchLeaderboard = async () => {
                try {
                    const response = await fetch("/api/leaderboard/lead", {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        }
                    });
                    const data = await response.json();
    
                    if (data.error) {
                        showToast("Error", data.error, "error");
                        return;
                    }
                    setUserRankData(data.userRankData || []);
                    setCurrentUserRank(data.currentUserRank);
                    setLoading(false);
                } catch (error) {
                    showToast("Error", "Failed to fetch leaderboard", "error");
                    setLoading(false);
                }
            };
    
            fetchLeaderboard();
        }, []);

  return (
    <>
        <Flex justifyContent={"space-between"} alignItems={"center"}>
            <Text fontSize={"2xl"} fontWeight={"bold"}>Leaderboard</Text>
            <Button size={"sm"} mt={2} ml={"auto"} as={routerLink} to={`/leaderboard`}>View More</Button>
        </Flex>
        <Divider my={4}/>

        {loading ? (
                [0, 1, 2, 3, 4].map((_, idx) => (
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
                ))
            ) : (
                currentUserRank && (
                    <>
                        <Text fontSize="lg" fontWeight="bold" my={1}>
                            Your Position
                        </Text>
                        {userRankData.map((user, index) => (
                            <Flex key={user._id} alignItems="center" p={2} borderRadius="md" mb={2} bg={user._id === currentUser._id ? userBG : "transparent"}
                                as={routerLink} to={`/${user.username}`}
                            >
                                <Text fontWeight="bold" mr={2}>
                                    {user.rank}
                                </Text>
                                <Flex flex="1">
                                    <Avatar size="md" name={user.name} src={user.profilePic} mr={2} />
                                    <Flex flex="1" flexDirection="column">
                                        <Text fontWeight="bold">{user.name}</Text>
                                        <Text fontSize="sm" color="gray.500">@{user.username}</Text>
                                    </Flex>
                                </Flex>
                                <Text fontWeight="bold">{user.xp} XP</Text>
                            </Flex>
                        ))}
                    </>
                )
            )}
    </>
  )
}

export default MiniLeaderboard