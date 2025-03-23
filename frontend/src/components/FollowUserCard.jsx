import React from 'react'
import useFollowUnfollow from '../hooks/useFollowUnfollow'
import { Link as routerLink } from 'react-router-dom'
import { Avatar, Box, Button, Flex, Text } from '@chakra-ui/react'
import { useRecoilValue } from 'recoil'
import userAtom from '../atoms/userAtom'

const FollowUserCard = ({user, onClose}) => {
    const { handleFollowUnfollow, following, updating } = useFollowUnfollow(user);
    const currentUser = useRecoilValue(userAtom);

  return (
    <Flex key={user._id} gap={2} justifyContent={"space-between"} alignItems={"center"}>
        <Flex gap={2} as={routerLink} to={`/${user.username}`} onClick={onClose}>
            <Avatar src={user.profilePic}  />
            <Box>
                <Text fontSize={"sm"} fontWeight={"bold"}>
                    {user.username}
                </Text>
                <Text color={"gray.light"} fontSize={"sm"}>
                    {user.name}
                </Text>
            </Box>
        </Flex>
        {user._id !== currentUser._id && (
            <Button
            size={"sm"}
            color={following ? "black" : "white"}
            bg={following ? "white" : "blue.400"}
            onClick={handleFollowUnfollow}
            isLoading={updating}
            _hover={{
                color: following ? "black" : "white",
                opacity: ".8",
            }}
        >
            {following ? "Unfollow" : "Follow"}
        </Button>
        )}
        
    </Flex>
  )
}

export default FollowUserCard