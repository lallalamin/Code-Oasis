import React, { useEffect, useState } from 'react'
import UserHeader from '../components/UserHeader'
import UserPost from '../components/UserPost'
import { useParams } from 'react-router-dom';
import useShowToast from '../hooks/useShowToast';
import { Flex, Spinner, Image, Text } from '@chakra-ui/react';
import Post from '../components/Post';
import useGetUserProfile from '../hooks/useGetUserProfile';
import { useRecoilState } from 'recoil';
import postsAtom from '../atoms/postsAtom';
import repliesAtom from '../atoms/repliesAtom';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react"

const UserPage = () => {
  const {username} = useParams();
  const {user, loading} = useGetUserProfile();
  const showToast = useShowToast();
  const [posts, setPosts] = useRecoilState(postsAtom);
  const [fetchingPosts, setFetchingPosts] = useState(true);
  const [replies, setReplies] = useRecoilState(repliesAtom);
  const [fetchingReplies, setFetchingReplies] = useState(true);

  useEffect(() => {
    const getPosts = async() => {
      if(!user) return;
      setFetchingPosts(true);
      try {
          const res = await fetch(`/api/posts/user/${username}`);
          const data = await res.json();
          console.log("data",data);
          setPosts(data);
      } catch (error) {
          showToast("Error", error.message, "error");
          setPosts([]);
      } finally {
          setFetchingPosts(false);
      }
    };

    const getReplies = async() => {
      if(!user) return;
      setFetchingReplies(true);
      try {
          const res = await fetch(`/api/posts/user/replies/${username}`);
          const data = await res.json();
          console.log("replies data",data);
          setReplies(data);
      } catch (error) {
          showToast("Error", error.message, "error");
          setReplies([]);
      } finally {
          setFetchingReplies(false);
      }
    }

    getPosts();
    getReplies();

  },[username, showToast, setPosts, user, setReplies]);

  if(!user && loading){
    return (
      <Flex justifyContent={"center"}>
        <Spinner size='xl' />
      </Flex>
    )
  }

  if(!user && !loading){
    return (
      <Flex justifyContent={"center"}>
        <h1>User not found</h1>
      </Flex>
    )
  }

  if(!user) return null;

  return (
    <>
        <UserHeader user={user}></UserHeader>
        <Tabs isFitted variant="enclosed" mt={4}>
          <TabList mb="1em">
            <Tab>Posts</Tab>
            <Tab>Replies</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
            {!fetchingPosts && posts.length === 0 && (
                <Flex justify="center" flexDirection={"column"} alignItems={"center"} >
                  <Text fontWeight={"bold"} padding={4} marginTop={4} >User has no posts</Text>
                  <Image src="/characters/Momo-NoPost.png" alt='post image' w={"300px"} />
              </Flex>
              )}
              {fetchingPosts && (
                <Flex justifyContent={"center"} my={12}>
                  <Spinner size='xl' />
                </Flex>
              )}
            {posts.map((post) => (
              <Post key={post._id} post={post} postedBy={post.postedBy}/>
            ))}
            </TabPanel>
            <TabPanel>
              <p>two!</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
    </>
  )
}

export default UserPage