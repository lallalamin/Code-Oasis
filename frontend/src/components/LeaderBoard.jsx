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
                leaderboard.map((user, index) => (
                    <Flex key={user._id} alignItems="center" p={2} borderRadius="md" mb={2}>
                        <Box mr={3}>
                            {index === 0 ? <Image src="/leaderboard/gold-cup.png" w="40px" /> :
                             index === 1 ? <Image src="/leaderboard/silver-cup.png" w="40px" /> :
                             index === 2 ? <Image src="/leaderboard/bronze-cup.png" w="40px" /> : null}
                        </Box>
                        <Flex flex="1">
                            <Avatar size="md" name={user.name} src={user.profilePic} mr={2} />
                            <Flex flex="1" flexDirection="column">
                                <Text fontWeight="bold">{user.name}</Text>
                                <Text fontSize="sm" color="gray.500">@{user.username}</Text>
                            </Flex>
                        </Flex>
                        <Text fontWeight="bold">{user.xp} XP</Text>
                    </Flex>
                ))
            )}

            {/* USER'S RELATIVE RANK (ALWAYS SHOW 5) */}
            {currentUserRank && (
                <>
                    <Divider my={4} />
                    <Text fontSize="lg" fontWeight="bold" my={1}>
                        Your Position
                    </Text>
                    {userRankData.map((user, index) => (
                        <Flex key={user._id} alignItems="center" p={2} borderRadius="md" mb={2} bg={user._id === currentUser._id ? useColorModeValue("gray.200", "gray.dark") : "transparent"}>
                            <Text fontWeight="bold" mr={2}>
                                #{currentUserRank - 2 + index}
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
