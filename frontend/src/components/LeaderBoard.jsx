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
                <Flex flexDirection="column" gap={4} align="center">
                    {/* Podium Display */}
                    <Flex justifyContent="center" alignItems="flex-end" mb={6}>
                        <Box textAlign="center" mx={2}>
                            <Avatar size="lg" src={leaderboard[1]?.profilePic} mb={2} as={routerLink} to={`/${leaderboard[1]?.username}`} />
                            <Text fontWeight="bold">{leaderboard[1]?.name}</Text>
                            <Flex flexDirection="column" alignItems="center" mt={2}>
                                <Image src="/leaderboard/silver-cup.png" w="40px" />
                                <Flex bg="gray.400" w="120px" h="80px" borderRadius="md" alignItems="flex-end" justifyContent="center" >
                                    <Text color={"black"} w={"full"} bg="gray.200" m={3} borderRadius="md" fontSize="sm" fontWeight="bold">{leaderboard[1]?.xp} XP</Text>
                                </Flex>
                            </Flex>
                        </Box>
                        <Box textAlign="center" mx={2}>
                            <Flex flexDirection="column" alignItems="center">
                                <Image src="/leaderboard/crown.png" w="40px" />
                                <Avatar size="lg" src={leaderboard[0]?.profilePic} mb={2} as={routerLink} to={`/${leaderboard[0]?.username}`}/>
                            </Flex>
                            <Text fontWeight="bold">{leaderboard[0]?.name}</Text>
                            <Flex flexDirection="column" alignItems="center" mt={2}>
                                <Image src="/leaderboard/gold-cup.png" w="40px" />
                                <Flex bg="gold" w="120px" h="100px" borderRadius="md" alignItems="flex-end" justifyContent="center" >
                                    <Text color={"black"} w={"full"} bg="yellow.100" m={3} borderRadius="md" fontSize="sm" fontWeight="bold">{leaderboard[0]?.xp} XP</Text>
                                </Flex>
                            </Flex>
                        </Box>
                        <Box textAlign="center" mx={2}>
                            <Avatar size="lg" src={leaderboard[2]?.profilePic} mb={2} as={routerLink} to={`/${leaderboard[2]?.username}`}/>
                            <Text fontWeight="bold">{leaderboard[2]?.name}</Text>
                            <Flex flexDirection="column" alignItems="center" mt={2}>
                                <Image src="/leaderboard/bronze-cup.png" w="40px" />
                                <Flex bg="orange.800" w="120px" h="60px" borderRadius="md" alignItems="flex-end" justifyContent="center" >
                                    <Text color={"black"} w={"full"} bg="orange.200" m={3} borderRadius="md" fontSize="sm" fontWeight="bold">{leaderboard[2]?.xp} XP</Text>
                                </Flex>
                            </Flex>
                        </Box>
                    </Flex>

                    {/* Remaining Users */}
                    <Flex flexDirection="column" w="full">
                        {leaderboard.slice(3).map((user) => (
                            <Flex key={user._id} alignItems="center" p={2} >
                                <Image src="/leaderboard/medal.png" w="40px" mr={2} />
                                <Text fontWeight="bold" mr={2}>{user.rank}</Text>
                                <Avatar size="md" src={user.profilePic} mr={2} as={routerLink} to={`/${user.username}`} />
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

            {/* USER'S RELATIVE RANK */}
            {currentUserRank && (
                <>
                    <Divider my={4} />
                    <Text fontSize="lg" fontWeight="bold" my={1}>
                        Your Position
                    </Text>
                    {userRankData.map((user, index) => (
                        <Flex key={user._id} alignItems="center" p={2} borderRadius="md" mb={2} bg={user._id === currentUser._id ? userBG : "transparent"}>
                            <Text fontWeight="bold" mr={2}>
                                {user.rank}
                            </Text>
                            <Flex flex="1">
                                <Avatar size="md" name={user.name} src={user.profilePic} mr={2}  as={routerLink} to={`/${user.username}`} />
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
