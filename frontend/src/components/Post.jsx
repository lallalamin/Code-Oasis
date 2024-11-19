import { Avatar, Box, Flex, Image, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Actions from './Actions'
import useShowToast from '../hooks/useShowToast'
import { set } from 'mongoose'
import { useNavigate } from 'react-router-dom'

import formatDistanceToNow from 'date-fns'


const Post = ({post, postedBy}) => {
    const [liked, setLiked] = useState(false);
    const showToast = useShowToast();
    const [user, setUser] = useState(null);
    const navigare = useNavigate();

    useEffect(() => {
        const getUser = async() => {
            try {
                const res = await fetch("/api/users/profile/" + postedBy);
                const data = await res.json();
                console.log(data);

                if(data.error) {
                    showToast("Error", data.error, "error");
                    return;
                }
                setUser(data);
            } catch (error) {
                showToast("Error", error.message, "error");
                setUser(null);
            }
        }

        getUser();
    }, [postedBy, showToast]);

    if(!user) {
        return null;
    }

  return (
    <>
    <Link to={`/${user.username}/post/4{post._id}`}>
        <Flex gap={3} mb={4} py={5}>
            <Flex flexDirection={"column"} alignItems={"center"}>
                <Avatar size="md" name={user.name} src={user?.profilePic} onClick={(e) => {
                    e.preventDefault();
                    navigare(`/${user.username}`);
                }}></Avatar>
                {/* <Box w="1px" h={"full"} bg={"gray.light"} my={2}></Box>
                <Box position={"relative"} w={"full"}>
                    <Avatar size={"xs"} name='John Doe' src='https://bit.ly/dan-abramov' position={"absolute"} top={"0px"} left={"15px"} padding={"2px"}/>
                    <Avatar size={"xs"} name='John Doe' src='https://bit.ly/dan-abramov' position={"absolute"} bottom={"0px"} right={"-5px"} padding={"2px"}/>
                    <Avatar size={"xs"} name='John Doe' src='https://bit.ly/dan-abramov' position={"absolute"} bottom={"0px"} left={"4px"} padding={"2px"}/>
                </Box> */}
            </Flex>
            <Flex flex={1} flexDirection={"column"} gap={2}>
                <Flex justifyContent={"space-between"} w={"full"}>
                    <Flex w={"full"} alignItems={"center"}>
                        <Text fontSize={"sm"} fontWeight={"bold"} onClick={(e) => {
                        e.preventDefault();
                        navigare(`/${user.username}`);
                    }}>{user?.username}</Text>
                        <Image src='/verified.png' w={4} h={4} ml={1}/>
                    </Flex>
                    <Flex gap={4} alignItems={"center"}>
                        <Text fontSize={"xs"} width={36} color={"gray.light"} textAlign={"right"}>
                            {formatDistanceToNow(new Date(post.createdAt))} ago
                        </Text>
                    </Flex>
                </Flex>
                <Text fontSize={"sm"}>
                    {post.text}
                </Text>
                {post.img && (
                    <Box borderRadius={6} overflow={"hidden"} border={"1px solid"} borderColor={"gray.light"}>
                        <Image src={post.img} w={"full"}/>
                    </Box>
                )}
                <Flex gap={3} my={1}>
                    <Actions liked={liked} setLiked={setLiked}/>
                </Flex>
                <Flex gap={2} alignItems={"center"}>
                    <Text color={"gray.light"} fontSize={"sm"}> {post.replies.length} replies</Text>
                    <Box w={0.5} h={0.5} bg={"gray.light"} borderRadius={"full"}></Box>
                    <Text color={"gray.light"} fontSize={"sm"}> {post.likes.length} likes</Text>
                </Flex>
            </Flex>
        </Flex>
    </Link>
    </>
  )
}

export default Post
