import { Flex, Avatar, Text, Image, Box, Divider, Button, Spinner} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { BsThreeDots } from 'react-icons/bs'
import Actions from '../components/Actions'
import Comment from '../components/Comment'
import useShowToast from '../hooks/useShowToast'
import useGetUserProfile from '../hooks/useGetUserProfile'
import { useParams } from 'react-router-dom'

const PostPage = () => {
    
  const {user, loading} = useGetUserProfile();
  const [post, setPost] = useState(null);
  const showToast = useShowToast();
  const {pid} = useParams();

  useEffect(() => {
      const getPost = async() => {
        try {
            const res = await fetch(`/api/posts/${pid}`);

            const data = await res.json();

            if(data.error) {
                showToast("Error", data.error, "error");
                return;
            }
            console.log(data);
            setPost(data);
            
        } catch (error) {
            showToast("Error", error.message, "error");
        }
      }

      getPost();
  },[showToast, pid]);

  if(!user && loading){
    return (
      <Flex justifyContent={"center"}>
        <Spinner size={"xl"}></Spinner>
      </Flex>
    );
  }

  if(!post) return null;

  return (
    <>
        <Flex>
            <Flex w={"full"} alignItems={"center"} gap={3}>
                <Avatar size="md" name={user.username} src={user.profilePic} mb={2}></Avatar>
                <Flex>
                    <Text fontSize={"sm"} fontWeight={"bold"}>{user.username}</Text>
                    <Image src='/verified.png' w={4} h={4} ml={1}/>
                </Flex>
            </Flex>
            <Flex gap={4} alignItems={"center"}>
                <Text fontStyle={"sm"} color={"gray.light"}>1d</Text>
                <BsThreeDots/>
            </Flex>
        </Flex>
        
        <Text my={3}>{post.text}</Text>

        {post.img && (
            <Box borderRadius={6} overflow={"hidden"} border={"1px solid"} borderColor={"gray.light"}>
                <Image src={post.img} w={"full"}/>
            </Box>
        )}

        <Flex gap={3} my={3}>
            <Actions post={post}></Actions>
        </Flex>
        <Flex gap={2} alignItems={"center"}>
            <Text color={"gray.light"} fontSize={"sm"}>
                {post.likes.length} likes
            </Text>
            <Box w={0.5} h={0.5} bg={"gray.light"} borderRadius={"full"}></Box>
            <Text color={"gray.light"} fontSize={"sm"}> 
                {post.replies.length} comments
            </Text>
        </Flex>
        <Divider my={4}/>
        {/* <Comment comment="Looks really good!" createdAt="1d" likes={100} username="johndoe" userAvatar="https://bit.ly/dan-abramov"></Comment> */}

    </>
  )
}

export default PostPage