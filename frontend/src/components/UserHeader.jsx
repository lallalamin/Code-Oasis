import { VStack, Box, Flex, Avatar, Text, Link, MenuButton, Menu, Portal, MenuList, MenuItem, useToast, Button } from '@chakra-ui/react'
import React from 'react'
import { BsInstagram } from 'react-icons/bs'
import { CgMoreO } from 'react-icons/cg'
import { useRecoilValue } from 'recoil'
import userAtom from '../atoms/userAtom'
import { Link as routerLink } from 'react-router-dom' // this link is doing routing through client side, it doesn't reload the page. it we don't have this it will reload the page
import { useState } from 'react'
import useShowToast from '../hooks/useShowToast'

const UserHeader = ({user}) => {
    const toast = useToast();
    const currentUser = useRecoilValue(userAtom); // this is the user that logged in
    const [following, setFollowing] = useState(user.followers.includes(currentUser?._id));
    const [updating, setUpdating] = useState(false);

    const showToast = useShowToast();

    const copyURL = () => {
        const currentUrl = window.location.href;
        navigator.clipboard.writeText(currentUrl).then(() =>{
            toast({
                title: 'Copied.',
                description: "Profile link copied to clipboard.",
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
        });
    };

    const handleFollowUnfollow = async () => {
        if(!currentUser){
            showToast("Error", "Please login to follow/unfollow users", "error");
            return;
        }
        if(updating) return;
        setUpdating(true);
        try {
            const res = await fetch(`/api/users/follow/${user._id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                }
            });
            const data = await res.json();
            
            if(data.error) {
                showToast("Error", data.error, "error");
                return;
            }

            if(following) {
                showToast("Success", `Unfollowed ${user.name}`, "success");
                //user.followers.pop(); // simulate removing the user from the followers array
                user.followers = user.followers.filter(followerId => followerId !== currentUser?._id); // create a new array without the current user's ID
            } else {
                showToast("Success", `Followed ${user.name}`, "success");
                //user.followers.push(currentUser._id);
                user.followers = [...user.followers, currentUser._id];
            }
            
            setFollowing(!following);

            console.log(data);
        }
            
        catch (error) {
            showToast("Error", data.error, "error");
        }
        finally{
            setUpdating(false);
        }
    }

  return (
    <>
        <VStack gap={4} alignItems={"start"}>
            <Flex justifyContent={"space-between"} w={"full"}>
                <Box>
                    <Text fontSize={"2xl"} fontWeight={"bold"}>
                        {user.name}
                    </Text>
                    <Flex gap={2} alignItems={"center"}>
                        <Text fontSize={"sm"}>{user.username}</Text>
                        <Text fontSize={"xs"} bg={"gray.dark"} color={"gray.light"} p={1} borderRadius={"full"}>
                            threads.net
                        </Text>
                    </Flex>
                </Box>
                <Box>
                    {user.profilePic && (
                        <Avatar 
                        name={user.name}
                        src={user.profilePic}
                        size={{
                            base: "md",
                            md: "xl",
                        }}
                    />
                    )}
                    {!user.profilePic && (
                        <Avatar 
                        name={user.name}
                        src="https://bit.ly/broken-link"
                        size={{
                            base: "md",
                            md: "xl",
                        }}
                    />
                    )}
                </Box>
            </Flex>
            <Text>{user.bio}</Text>

            {currentUser?._id === user._id && (
                <Link as={routerLink} to='/update'>
                    <Button>Update Profile</Button>
                </Link>
            )}
            {currentUser?._id !== user._id && (
                <Link>
                    <Button onClick={handleFollowUnfollow} isLoading={updating}>{following ? "Unfollow" : "Follow"}</Button>
                </Link>
            )}

            <Flex w={"full"} justifyContent={"space-between"}>
                <Flex gap={2} alignItems={"center"}>
                    <Text color={"gray.light"}>{user.followers.length} followers</Text>
                    <Box w={1} h={1} bg={"gray.light"} borderRadius={"full"}></Box>
                    <Link color={"gray.light"}>instagram.com</Link>
                </Flex>
                <Flex>
                    <Box className='icon-container'>
                        <BsInstagram size={24} cursor={"pointer"}/>
                    </Box>
                    <Box className='icon-container'>
                        <Menu>
                            <MenuButton>
                                <CgMoreO size={24} cursor={"pointer"}/> 
                            </MenuButton>
                            <Portal>
                                <MenuList bg={"gray.dark"}>
                                    <MenuItem bg={"gray.dark"} onClick={copyURL}>Copy Link</MenuItem>
                                </MenuList>
                            </Portal>
                        </Menu>
                    </Box>
                </Flex>
            </Flex>
            <Flex w={"full"}>
                <Flex flex={1} borderBottom={"1.5px solid white"} justifyContent={"center"} pb="3" cursor={"pointer"}>
                    <Text fontWeight={"bold"}>Post</Text>
                </Flex>
                <Flex flex={1} borderBottom={"1px solid gray"} justifyContent={"center"} pb="3" cursor={"pointer"} color={"gray.light"}>
                    <Text fontWeight={"bold"}>Replies</Text>
                </Flex>
            </Flex>
        </VStack>
        
    </>
  )
}

export default UserHeader