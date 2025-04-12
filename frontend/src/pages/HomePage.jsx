import { Box, Button, Flex, Spinner, Text, Image, Divider } from "@chakra-ui/react";
import { useEffect } from "react";
import {Link} from "react-router-dom";
import useShowToast from "../hooks/useShowToast";
import { useState } from "react";
import Post from "../components/Post";
import { useRecoilState } from "recoil";
import postsAtom from "../atoms/postsAtom";
import { useNavigate } from "react-router-dom";
import SuggestedUsers from "../components/SuggestedUsers";
import CustomCalendar from "../components/CustomCalendar";
import MiniLeaderboard from "../components/MiniLeaderboard";
import { Link as RouterLink } from 'react-router-dom'
import useLogout from "../hooks/useLogout";

const HomePage = () => {
    const [posts, setPosts] = useRecoilState(postsAtom);
    const [loading, setLoading] = useState(true);
    const showToast = useShowToast();
    const navigate = useNavigate();

    useEffect(() => {
        const getFeedPosts = async() => {
            setLoading(true);
            setPosts([]);
            try {
                const res = await fetch("/api/posts/feed",
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                const data = await res.json();

                if (!res.ok || data?.message === "Unauthorized" || data?.error === "User not found") {
                    logout(); // logs out and redirects to /auth
                    return;
                }

                if(data.error) {
                    showToast("Error", data.error, "error");
                    return;
                }
                setPosts(Array.isArray(data) ? data : []);
            } catch (error) {
                if(error.response?.status === 401) {
                    navigate("/login");
                }
                showToast("Error", error.message, "error");
            } finally {
                setLoading(false);
            }
        }

        getFeedPosts();
    }, [showToast, setPosts]);

    return(
        <Flex gap={10} alignItems={"flex-start"}>
            <Box flex={70} >
                <Flex>
                    <Text fontSize={"2xl"} fontWeight={"bold"}>Events Calendar</Text>
                    <Button size={"sm"} mt={2} ml={"auto"} as={RouterLink} to={`/events`}>View All Events </Button>
                </Flex>
                <Divider my={4}/>
                <CustomCalendar/>

                <Text fontSize={"2xl"} fontWeight={"bold"} my={5}>Post</Text>
                <Divider my={4}/>

                {!loading && posts.length === 0 && (
                    <Flex justify="center" flexDirection={"column"} alignItems={"center"}>
                        <Text fontWeight={"bold"}>Follow some users to see the feed . . .</Text>
                        <Image src="/characters/Ricky-NoFollowing.png" alt='post image' w={"300px"} />
                    </Flex>
                )}

                {loading && (
                    <Flex justify="center">
                        <Spinner size="xl" />
                    </Flex>
                )}

                {posts.map((post) => (
                    <Post key={post._id} post={post} postedBy={post.postedBy}></Post>
                ))}
            </Box>
            <Box flex={30} display={{base: "none", md: "block"}}>
                <SuggestedUsers />
                <MiniLeaderboard/>
            </Box>
        </Flex>
    );
}

export default HomePage;