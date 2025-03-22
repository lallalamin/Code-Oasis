import { Flex, Avatar, Text, Image, Box, Divider, Button, Spinner} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { BsThreeDots } from 'react-icons/bs'
import Actions from '../components/Actions'
import Comment from '../components/Comment'
import useShowToast from '../hooks/useShowToast'
import useGetUserProfile from '../hooks/useGetUserProfile'
import { useParams } from 'react-router-dom'
import { formatDistanceToNow } from 'date-fns'
import { useRecoilState, useRecoilValue } from 'recoil'
import userAtom from '../atoms/userAtom'
import { DeleteIcon } from '@chakra-ui/icons'
import { useNavigate } from 'react-router-dom'
import postsAtom from '../atoms/postsAtom'


const PostPage = () => {
    
  const {user, loading} = useGetUserProfile();
  const [posts, setPosts] = useRecoilState(postsAtom);
  const showToast = useShowToast();
  const {pid} = useParams();
  const currentUser = useRecoilValue(userAtom);
  const navigate = useNavigate();
  const currentPost = posts[0];

  useEffect(() => {
      const getPost = async() => {
        setPosts([]);
        try {
            const res = await fetch(`/api/posts/${pid}`);

            const data = await res.json();

            if(data.error) {
                showToast("Error", data.error, "error");
                return;
            }

            setPosts([data]);
            
        } catch (error) {
            showToast("Error", error.message, "error");
        }
      }

      getPost();
  },[showToast, pid, setPosts]);

  const handleDeletePost = async() => {
    try {
        if(!window.confirm("Are you sure you want to delete this post?")) return;

        const res = await fetch("/api/posts/" + currentPost._id, {
            method: "DELETE",
        });

        const data = await res.json();

        if(data.error) {
            showToast("Error", data.error, "error");
            return;
        }

        showToast("Success", "Post deleted successfully", "success");
        navigate(`/${user.username}`);
    } catch (error) {
        showToast("Error", error.message, "error");
    }
}

  if(!user && loading){
    return (
      <Flex justifyContent={"center"}>
        <Spinner size={"xl"}></Spinner>
      </Flex>
    );
  }

  if(!currentPost) return null;

  return (
    <>
        <Flex>
            <Flex w={"full"} alignItems={"center"} gap={3}>
                <Avatar size="md" name={user.username} src={user.profilePic} mb={2}></Avatar>
                <Flex>
                    <Text fontSize={"sm"} fontWeight={"bold"}>{user.username}</Text>
                </Flex>
            </Flex>
            <Flex gap={4} alignItems={"center"}>
                <Text fontSize={"xs"} width={36} color={"gray.light"} textAlign={"right"}>
                    {formatDistanceToNow(new Date(currentPost.createdAt))} ago
                </Text>
                {currentUser?._id === user._id && <DeleteIcon size={20} onClick={handleDeletePost} cursor={"pointer"} />}
            </Flex>
        </Flex>
        
        <Text my={3}>{currentPost.text}</Text>

        {currentPost.img && (
            <Box borderRadius={6} overflow={"hidden"} border={"1px solid"} borderColor={"gray.light"}>
                <Image src={currentPost.img} w={"full"}/>
            </Box>
        )}

        <Flex gap={3} my={3}>
            <Actions post={currentPost}></Actions>
        </Flex>

        <Divider my={4}/>
        {currentPost.replies.map(reply => (
             <Comment key={reply._id} reply={reply} 
                lastReply={reply._id === currentPost.replies[currentPost.replies.length - 1]._id}
             ></Comment>
        ))}
       

    </>
  )
}

export default PostPage