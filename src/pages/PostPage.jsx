import { Flex, Avatar, Text, Image, Box, Divider, Button } from '@chakra-ui/react'
import React, { useState } from 'react'
import { BsThreeDots } from 'react-icons/bs'
import Actions from '../components/Actions'
import Comment from '../components/Comment'

const PostPage = () => {
    const [liked, setLiked] = useState(false)
  return (
    <>
        <Flex>
            <Flex w={"full"} alignItems={"center"} gap={3}>
                <Avatar size="md" name='Mark Zuckerberg' src='/zuck-avatar.png'></Avatar>
                <Flex>
                    <Text fontSize={"sm"} fontWeight={"bold"}>markzuckerberg</Text>
                    <Image src='/verified.png' w={4} h={4} ml={1}/>
                </Flex>
            </Flex>
            <Flex gap={4} alignItems={"center"}>
                <Text fontStyle={"sm"} color={"gray.light"}>1d</Text>
                <BsThreeDots/>
            </Flex>
        </Flex>
        <Text>
            Let's talk about Threads.
        </Text>

        <Box borderRadius={6} overflow={"hidden"} border={"1px solid"} borderColor={"gray.light"}>
            <Image src="/post1.png" w={"full"}/>
        </Box>

        <Flex gap={3} my={3}>
            <Actions liked={liked} setLiked={setLiked}></Actions>
        </Flex>
        <Flex gap={2} alignItems={"center"}>
            <Text color={"gray.light"} fontSize={"sm"}>
                {200 + (liked ? 1:0)} likes
            </Text>
            <Box w={0.5} h={0.5} bg={"gray.light"} borderRadius={"full"}></Box>
            <Text color={"gray.light"} fontSize={"sm"}> 
                248 comments
            </Text>
        </Flex>
        <Divider my={4}/>
        <Comment comment="Looks really good!" createdAt="1d" likes={100} username="johndoe" userAvatar="https://bit.ly/dan-abramov"></Comment>
        <Comment comment="Nice!" createdAt="1d" likes={234} username="johndoe" userAvatar="https://bit.ly/dan-abramov"></Comment>
        <Comment comment="Amazing!" createdAt="1d" likes={123} username="johndoe" userAvatar="https://bit.ly/dan-abramov"></Comment>
    </>
  )
}

export default PostPage