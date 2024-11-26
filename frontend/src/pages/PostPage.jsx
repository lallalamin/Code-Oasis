import { Flex, Avatar, Text, Image, Box, Divider, Button, Spinner} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { BsThreeDots } from 'react-icons/bs'
import Actions from '../components/Actions'
import Comment from '../components/Comment'
import useShowToast from '../hooks/useShowToast'
import useGetUserProfile from '../hooks/useGetUserProfile'
import { useParams } from 'react-router-dom'
import { formatDistanceToNow } from 'date-fns'
import { useRecoilValue } from 'recoil'
import userAtom from '../atoms/userAtom'
import { DeleteIcon } from '@chakra-ui/icons'
import { useNavigate } from 'react-router-dom'


const PostPage = () => {
    
  const {user, loading} = useGetUserProfile();
  const [post, setPost] = useState(null);
  const showToast = useShowToast();
  const {pid} = useParams();
  const currentUser = useRecoilValue(userAtom);
  const navigate = useNavigate();

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

  const handleDeletePost = async() => {
    try {
        if(!window.confirm("Are you sure you want to delete this post?")) return;

        const res = await fetch("/api/posts/" + post._id, {
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
                <Text fontSize={"xs"} width={36} color={"gray.light"} textAlign={"right"}>
                    {formatDistanceToNow(new Date(post.createdAt))} ago
                </Text>
                {currentUser?._id === user._id && <DeleteIcon size={20} onClick={handleDeletePost} cursor={"pointer"} />}
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

        <Divider my={4}/>
        {post.replies.map(reply => (
             <Comment key={reply._id} reply={reply} 
                lastReply={reply._id === post.replies[post.replies.length - 1]._id}
             ></Comment>
        ))}
       

    </>
  )
}

export default PostPage