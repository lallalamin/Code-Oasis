import { Box, Button, Flex, Spinner } from "@chakra-ui/react";
import { useEffect } from "react";
import {Link} from "react-router-dom";
import useShowToast from "../hooks/useShowToast";
import { useState } from "react";
import Post from "../components/Post";
import { useRecoilState } from "recoil";
import postsAtom from "../atoms/postsAtom";
import { useNavigate } from "react-router-dom";
import SuggestedUsers from "../components/SuggestedUsers";
const HomePage = () => {
    const [posts, setPosts] = useRecoilState(postsAtom);
    const [loading, setLoading] = useState(true);
    const showToast = useShowToast();
    const navigate = useNavigate();

    useEffect(() => {
        const getFeedPosts = async() => {
            setLoading(true);
            setPosts([]);
            console.log("getFeedPosts", posts);
            try {
                const res = await fetch("/api/posts/feed");
                const data = await res.json();
                console.log(data);
                if (data?.message === "Unauthorized") {
                    navigate("/login"); // Redirect on unauthorized
                    return;
                }
                if(data.error) {
                    //showToast("Error", data.error, "error");
                    navigate("/login");
                    return;
                }
                console.log(data);
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
            {!loading && posts.length === 0 && <h1>Follow some users to see the feed</h1>}

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
                <SuggestedUsers/>
            </Box>
        </Flex>
    );
}

export default HomePage;