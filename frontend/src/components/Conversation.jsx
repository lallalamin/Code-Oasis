import { Avatar, AvatarBadge, Flex, Stack, useColorModeValue, WrapItem, Text, Image, Box } from '@chakra-ui/react'
import React from 'react'
import { useRecoilState, useRecoilValue } from 'recoil';
import userAtom from '../atoms/userAtom';
import { BsCheck2All, BsFillImageFill } from 'react-icons/bs'
import { selectedConversationAtom } from '../atoms/messagesAtom';
import { useColorMode } from '@chakra-ui/react'

const Conversation = ({conversation, isOnline}) => {
    const user = conversation.participants[0];
    const currentUser = useRecoilValue(userAtom);
    const lastMessage = conversation.lastMessage;
    const [selectedConversation, setSelectedConversation] = useRecoilState(selectedConversationAtom);
    const colorMode = useColorMode();

  return (
    <Flex gap={4} alignItems={"center"} p={"1"} 
    _hover={{cursor: "pointer", bg: useColorModeValue("gray.200", "gray.dark"), color: useColorModeValue("black", "white")}} borderRadius={"md"} 
    onClick={() => setSelectedConversation({ 
        _id: conversation._id,
        userId: user._id,
        userProfilePic: user.profilePic,
        userName: user.username,
        mock: conversation.mock,
        })} 
        bg={selectedConversation?._id === conversation._id ? useColorModeValue("gray.200", "gray.dark")
            : "transparent"}
        >
        <WrapItem>
            <Avatar size={{base:"xs", sm:"sm", md:"md"}} src={user.profilePic}>
                {isOnline ? <AvatarBadge boxSize='1em' bg='green.500' /> : ""}
            </Avatar>
        </WrapItem>
        <Stack direction={"column"} fontSize={"sm"}>
            <Text fontWeight={"700"} display={"flex"} alignItems={"center"}>
                {user.username}
            </Text>
            <Text fontSize={"xs"} display={"flex"} alignItems={"center"} gap={1}>
                {currentUser._id === lastMessage.sender ? (
                    <Box color={lastMessage.seen ? "blue.400" : ""}>
                        <BsCheck2All size={16} />
                    </Box>
                ) : ""}
                {conversation.mock ? "" : lastMessage.text ? (lastMessage.text.length > 18 ? lastMessage.text.substring(0, 15) + "..." : lastMessage.text) : (<BsFillImageFill size={16} />)}
            </Text>
        </Stack>
    </Flex>
  )
}

export default Conversation