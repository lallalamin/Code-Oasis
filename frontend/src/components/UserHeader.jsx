import { VStack, Box, Flex, Avatar, Text, Link, MenuButton, Menu, Portal, MenuList, MenuItem, useToast, Button, Image, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from '@chakra-ui/react'
import React from 'react'
import { BsInstagram } from 'react-icons/bs'
import { CgMoreO } from 'react-icons/cg'
import { useRecoilValue } from 'recoil'
import userAtom from '../atoms/userAtom'
import { Link as routerLink } from 'react-router-dom' // this link is doing routing through client side, it doesn't reload the page. it we don't have this it will reload the page
import useFollowUnfollow from '../hooks/useFollowUnfollow'
import { useDisclosure } from '@chakra-ui/react'
import { useState } from 'react'


const UserHeader = ({user}) => {
    const toast = useToast();
    const currentUser = useRecoilValue(userAtom); // this is the user that logged in
    const {handleFollowUnfollow, following, updating} = useFollowUnfollow(user);
    const {isOpen, onOpen, onClose} = useDisclosure();
    const [followModal, setFollowModal] = useState('');

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

    const openModal = (type) => {
        setFollowModal(type);
        console.log(user.followers);
        onOpen();
    }


  return (
    <>
        <VStack gap={4} alignItems={"start"}>
            
            <Box position={"relative"} w={"full"} h={"150px"}>
                    <Image
                    h="150px"
                    w="full"
                    src={user.bannerPic || '/default-banner.png'} // Use user's banner or fallback to default
                    alt="User banner"
                    objectFit="cover" // This replaces `bgSize="cover"`
                    borderRadius="lg"
                    />
                    {user.profilePic && (
                        <Avatar 
                        name={user.name}
                        src={user.profilePic}
                        size={{
                            base: "lg",
                            md: "xl",
                        }}
                        borderWidth={3}
                        position="absolute"
                        bottom="-30px"
                        right="20px"
                    />
                    )}
                    {!user.profilePic && (
                        <Avatar 
                        name={user.name}
                        src="https://bit.ly/broken-link"
                        size={{
                            base: "lg",
                            md: "xl",
                        }}
                        borderWidth={3}
                        position="absolute"
                        bottom="-30px"
                        right="20px"
                    />
                    )}
            </Box>
            <Flex justifyContent={"space-between"} w={"full"}>
                <Box>
                    <Text fontSize={"2xl"} fontWeight={"bold"}>
                        {user.name}
                    </Text>
                    <Flex gap={2} alignItems={"center"}>
                        <Text fontSize={"sm"}>{user.username}</Text>
                    </Flex>
                </Box>
                <Flex justifyContent="center" gap={8} w="full" mt={4}>
                    <Flex gap={1} alignItems={"center"} flexDirection={"column"}  onClick={() => openModal('followers')}>
                        <Text fontWeight={"bold"}>{user.followers.length} </Text>
                        <Text color={"gray.light"}>followers</Text>
                    </Flex>
                    <Flex gap={1} alignItems={"center"} flexDirection={"column"} onClick={() => openModal('followings')}>
                        <Text fontWeight={"bold"}>{user.following.length} </Text>
                        <Text color={"gray.light"}>following</Text>
                    </Flex>
                    
                </Flex>
                <Flex justifyContent={"center"} alignItems={"end"}>
                    <Button size={"sm"} w={"100px"} bg={"yellow.400"} color={"black"}> 100 xp</Button>
                </Flex>
            </Flex>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>
                {followModal === 'followers' ? 'Followers' : 'Followings'}
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                {followModal === 'followers' && user.followers.length > 0 ? (
                    user.followers.map((follower, index) => (
                    <Flex
                        key={index}
                        alignItems="center"
                        mb={2}
                        gap={2}
                        borderBottom="1px solid #e2e8f0"
                        pb={2}
                    >
                        <Avatar size="sm" src={follower.profilePic || ''} />
                        <Text>{follower.name || 'Anonymous'}</Text>
                    </Flex>
                    ))
                ) : followModal === 'followings' && user.following.length > 0 ? (
                    user.following.map((following, index) => (
                    <Flex
                        key={index}
                        alignItems="center"
                        mb={2}
                        gap={2}
                        borderBottom="1px solid #e2e8f0"
                        pb={2}
                    >
                        <Avatar size="sm" src={following.profilePic || ''} />
                        <Text>{following.name || 'Anonymous'}</Text>
                    </Flex>
                    ))
                ) : (
                    <Text>No data available.</Text>
                )}
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='blue'  onClick={onClose}>
                    Close
                    </Button>
                </ModalFooter>
                </ModalContent>
            </Modal>

            {currentUser?._id === user._id && (
                <Link as={routerLink} to='/update'>
                    <Button>Update Profile</Button>
                </Link>
            )}

            <Text>{user.bio}</Text>

            
            {currentUser?._id !== user._id && (
                <Link>
                    <Button onClick={handleFollowUnfollow} isLoading={updating}>{following ? "Unfollow" : "Follow"}</Button>
                </Link>
            )}

            <Flex w={"full"} justifyContent={"space-between"}>
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