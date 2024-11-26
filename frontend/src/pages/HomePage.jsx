import { Button, Flex, Spinner } from "@chakra-ui/react";
import { useEffect } from "react";
import {Link} from "react-router-dom";
import useShowToast from "../hooks/useShowToast";
import { useState } from "react";
import Post from "../components/Post";
import { useRecoilState } from "recoil";
import postsAtom from "../atoms/postsAtom";

const HomePage = () => {
    const [posts, setPosts] = useRecoilState(postsAtom);
    const [loading, setLoading] = useState(true);
    const showToast = useShowToast();

    useEffect(() => {
        const getFeedPosts = async() => {
            setLoading(true);
            try {
                const res = await fetch("/api/posts/feed");
                const data = await res.json();
                if(data.error) {
                    showToast("Error", data.error, "error");
                    return;
                }
                setPosts(data);
            } catch (error) {
                showToast("Error", error.message, "error");
            } finally {
                setLoading(false);
            }
        }

        getFeedPosts();
    }, [showToast, setPosts]);

    return(
        <>
            {!loading && posts.length === 0 && <h1>Follow some users to see the feed</h1>}

            {loading && (
                <Flex justify="center">
                    <Spinner size="xl" />
                </Flex>
            )}

            {posts.map((post) => (
                <Post key={post._id} post={post} postedBy={post.postedBy}></Post>
            ))}
            
        </>
    );
}

export default HomePage;