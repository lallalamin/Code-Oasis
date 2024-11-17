import { Avatar, Box, Flex, Image, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { BsThreeDots } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import Actions from './Actions'
import useShowToast from '../hooks/useShowToast'
import { set } from 'mongoose'


const Post = ({post, postedBy}) => {
    const [liked, setLiked] = useState(false);
    const showToast = useShowToast();
    const [user, setUser] = useState(null);

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
    <Link to={"/markzuckerberg/post/1"}>
        <Flex gap={3} mb={4} py={5}>
            <Flex flexDirection={"column"} alignItems={"center"}>
                <Avatar size="md" name={user.name} src={user?.profilePic}></Avatar>
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
                        <Text fontSize={"sm"} fontWeight={"bold"}>{user?.username}</Text>
                        <Image src='/verified.png' w={4} h={4} ml={1}/>
                    </Flex>
                    <Flex gap={4} alignItems={"center"}>
                        <Text fontStyle={"sm"} color={"gray.light"}>1d</Text>
                        <BsThreeDots/>
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
