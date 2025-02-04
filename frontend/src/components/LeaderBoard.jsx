import React, { useEffect, useState } from "react";
import { Flex, Text, Box, Divider, Image, SkeletonCircle, Skeleton, Avatar } from "@chakra-ui/react";
import useShowToast from "../hooks/useShowToast";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import { Link as routerLink } from "react-router-dom";
import { useColorModeValue } from "@chakra-ui/react";

const LeaderBoard = () => {
    const [leaderboard, setLeaderboard] = useState([]);
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

                console.log(data);
                setLeaderboard(data.topUsers);
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
        <Box>
            <Text fontSize="2xl" fontWeight="bold" my={1}>
                Leaderboard
            </Text>
            <Divider my={4} />

            {/* TOP 10 USERS */}
            {loading ? (
                [0, 1, 2, 3, 4].map((_, idx) => (
                    <Flex key={idx} gap={2} alignItems={"center"} p={"1"} borderRadius={"md"}>
                        <SkeletonCircle size="10" />
                        <Flex flexDirection={"column"} gap={2} w="full">
                            <Skeleton w="80px" h="8px" borderRadius="md" />
                            <Skeleton w="90px" h="8px" borderRadius="md" />
                        </Flex>
                        <Skeleton w="60px" h="20px" borderRadius="md" />
                    </Flex>
                ))
            ) : (
                <Flex flexDirection="column" align="center">
                    {/* Podium Display */}
                    <Flex justifyContent="center" alignItems="flex-end" mb={6}>
                        <Box textAlign="center" mx={2}>
                            <Avatar size="lg" src={leaderboard[1]?.profilePic} mb={2} />
                            <Text fontWeight="bold">#{leaderboard[1]?.rank} {leaderboard[1]?.name}</Text>
                            <Box bg="gray.300" w="80px" h="60px" borderRadius="md" />
                        </Box>
                        <Box textAlign="center" mx={2}>
                            <Avatar size="lg" src={leaderboard[0]?.profilePic} mb={2} />
                            <Text fontWeight="bold">#{leaderboard[0]?.rank} {leaderboard[0]?.name}</Text>
                            <Box bg="gold" w="100px" h="80px" borderRadius="md" />
                        </Box>
                        <Box textAlign="center" mx={2}>
                            <Avatar size="lg" src={leaderboard[2]?.profilePic} mb={2} />
                            <Text fontWeight="bold">#{leaderboard[2]?.rank} {leaderboard[2]?.name}</Text>
                            <Box bg="silver" w="80px" h="60px" borderRadius="md" />
                        </Box>
                    </Flex>

                    {/* Remaining Users */}
                    <Flex flexDirection="column" w="full">
                        {leaderboard.slice(3).map((user) => (
                            <Flex key={user._id} alignItems="center" p={2}>
                                <Text fontWeight="bold" mr={2}>#{user.rank}</Text>
                                <Avatar size="md" src={user.profilePic} mr={2} />
                                <Flex flexDirection="column">
                                    <Text fontWeight="bold">{user.name}</Text>
                                    <Text fontSize="sm" color="gray.500">@{user.username}</Text>
                                </Flex>
                                <Text fontWeight="bold" ml="auto">{user.xp} XP</Text>
                            </Flex>
                        ))}
                    </Flex>
                </Flex>
            )}

            {/* USER'S RELATIVE RANK (ALWAYS SHOW 5) */}
            {currentUserRank && (
                <>
                    <Divider my={4} />
                    <Text fontSize="lg" fontWeight="bold" my={1}>
                        Your Position
                    </Text>
                    {userRankData.map((user, index) => (
                        <Flex key={user._id} alignItems="center" p={2} borderRadius="md" mb={2} bg={user._id === currentUser._id ? userBG : "transparent"}>
                            <Text fontWeight="bold" mr={2}>
                                #{user.rank}
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
            )}
        </Box>
    );
};

export default LeaderBoard;
