import React, { useEffect, useState } from 'react'
import UserHeader from '../components/UserHeader'
import UserPost from '../components/UserPost'
import { useParams } from 'react-router-dom';
import useShowToast from '../hooks/useShowToast';
import { Flex, Spinner, Image, Text, Box } from '@chakra-ui/react';
import Post from '../components/Post';
import Reply from '../components/Reply';
import ToDoContainer from '../components/ToDoContainer';
import useGetUserProfile from '../hooks/useGetUserProfile';
import { useRecoilState, useRecoilValue } from 'recoil';
import postsAtom from '../atoms/postsAtom';
import repliesAtom from '../atoms/repliesAtom';
import { useColorModeValue } from '@chakra-ui/react';
import { Tabs, TabList, TabPanels, Tab, TabPanel, Divider } from "@chakra-ui/react"
import CreatePost from '../components/CreatePost';

const UserPage = () => {
  const {username} = useParams();
  const [fetchingPosts, setFetchingPosts] = useState(true);
  const [fetchingReplies, setFetchingReplies] = useState(true);
  const {user, loading} = useGetUserProfile();
  const showToast = useShowToast();
  const [posts, setPosts] = useRecoilState(postsAtom);
  const [replies, setReplies] = useRecoilState(repliesAtom);
  const tabColor = useColorModeValue("gray.600", "gray.400");

  useEffect(() => {
    const getPosts = async() => {
      if(!user) return;
      setFetchingPosts(true);
      try {
          const res = await fetch(`/api/posts/user/${username}`);
          const data = await res.json();
          setPosts(data);
      } catch (error) {
          if(error.message === "User not found") return;
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
          setReplies(data);
      } catch (error) {
          if(error.message === "User not found") return;
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
      <Flex flexDirection={"column"} justifyContent={"center"} alignItems={"center"}>
        <Text fontWeight={"bold"}>User not found</Text>
        <Image src="/characters/bruno_nouser.png" alt='post image' w={"120px"} />
      </Flex>
    )
  }

  if(!user) return null;

  return (
    <>
        <UserHeader user={user}></UserHeader>
        <Flex direction="column" alignItems={"flex-end"}>
          <ToDoContainer user={user} />
          <Box>
            <CreatePost user={user} />
          </Box>
        </Flex>
        <Tabs isFitted variant="enclosed" mt={4} colorScheme="blue" >
          <TabList mb="1em">
            <Tab color={tabColor}>Posts</Tab>
            <Tab color={tabColor}>Replies</Tab>
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
              {!fetchingReplies && replies.length === 0 && (
                <Flex justify="center" flexDirection={"column"} alignItems={"center"} >
                  <Text fontWeight={"bold"} padding={4} marginTop={4} >User has no replies</Text>
                  <Image src="/characters/Momo-NoPost.png" alt='post image' w={"300px"} />
              </Flex>
              )}
              {fetchingReplies && (
                <Flex justifyContent={"center"} my={12}>
                  <Spinner size='xl' />
                </Flex>
              )}
              {replies.map((reply) => (
                <Flex key={reply._id} flexDirection={"column"}>
                  <Post post={reply} postedBy={reply.postedBy}/>
                  <Divider mb={4}/>
                  <Reply reply={reply.replies} />
                </Flex>
              ))}
            </TabPanel>
          </TabPanels>
        </Tabs>
    </>
  )
}

export default UserPage