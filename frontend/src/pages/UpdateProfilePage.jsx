'use client'

import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  Avatar,
  Center,
  Textarea,
  Image
} from '@chakra-ui/react'
import { useState, useRef } from 'react'
import { useRecoilState } from 'recoil'
import { useNavigate } from 'react-router-dom'
import userAtom from '../atoms/userAtom'
import usePreviewImg from '../hooks/usePreviewImg'
import usePreviewBanner from '../hooks/usePreviewBanner'
import useShowToast from '../hooks/useShowToast'


export default function UpdateProfilePage() {
  const [user, setUser] = useRecoilState(userAtom);
  const [inputs, setInputs] = useState({
    name: user.name,
    username: user.username,
    email: user.email,
    bio: user.bio,
    password: "",
    // linkedinUrl: "",
    // hobbies: "",
  });
  
  const fileRef = useRef(null);
  const bannerRef = useRef(null);
  const [updating, setUpdating]  = useState(false);
  const showToast = useShowToast();
  const navigate = useNavigate();

  const { handleImageChange, imgUrl } = usePreviewImg();
  const { handleBannerChange, imgUrl: bannerUrl } = usePreviewBanner();

  const handleSubmit = async(e) => {
    e.preventDefault();
    if(updating) return;
    setUpdating(true);
      try {
        const res = await fetch(`/api/users/update/${user._id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({...inputs, profilePic: imgUrl, bannerPic: bannerUrl}),
        })

        const data = await res.json(); // updates user object

        if(data.error) {
            showToast("Error", data.error, "error");
            return;
        }

        const updatedUser = data.user ? data.user : data;
        
        showToast("Success", "Profile successfully updated", "success");
        setUser(updatedUser);

        localStorage.setItem('user-threads', JSON.stringify(updatedUser));

        navigate(`/${updatedUser.username}`);

      } catch (error) {
        showToast("Error", error, "error");
      }finally {
        setUpdating(false);
      }
  }

  return (
    <form onSubmit={handleSubmit}>
        <Flex
        align={'center'}
        justify={'center'}
        my={6}
        >
        <Stack
            spacing={4}
            w={'full'}
            maxW={'md'}
            bg={useColorModeValue('white', 'gray.dark')}
            rounded={'xl'}
            boxShadow={'lg'}
            p={6}>
            <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
            User Profile Edit
            </Heading>
            <FormControl id="profilePic">
            <Stack direction={['column', 'row']} spacing={6}>
                <Center>
                <Avatar size="xl" boxShadow={"md"} src={imgUrl || user.profilePic} />
                </Center>
                <Center w="full">
                <Button w="full" onClick={() => fileRef.current.click()}>Change Avatar</Button>
                <Input type='file' hidden ref={fileRef} onChange={handleImageChange} />
                </Center>
            </Stack>
            </FormControl>
            
            <FormControl id="banner">
            <Stack direction={['column']} spacing={6}>
              <Center>
                <Image
                  h="150px"
                  w="full"
                  src={bannerUrl || user.bannerPic || '/default-banner.png'} 
                  alt="User banner"
                  objectFit="cover" 
                  borderRadius="lg"
                  />
              </Center>
              <Center w="full">
                <Button w="full" onClick={() => bannerRef.current.click()}>Change Banner</Button>
                <Input type='file' hidden ref={bannerRef} onChange={handleBannerChange} />
              </Center>
            </Stack>
            </FormControl>
            
            <FormControl>
            <FormLabel>Full name</FormLabel>
            <Input
                placeholder="Jane Doe"
                value={inputs.name}
                onChange={(e) => setInputs({...inputs, name: e.target.value})}
                _placeholder={{ color: 'gray.500' }}
                type="text"
            />
            </FormControl>
            <FormControl>
            <FormLabel>User name</FormLabel>
            <Input
                placeholder="janedoe"
                value={inputs.username}
                onChange={(e) => setInputs({...inputs, username: e.target.value})}
                _placeholder={{ color: 'gray.500' }}
                type="text"
            />
            </FormControl>
            <FormControl>
            <FormLabel>Email address</FormLabel>
            <Input
                placeholder="your-email@example.com"
                value={inputs.email}
                onChange={(e) => setInputs({...inputs, email: e.target.value})}
                _placeholder={{ color: 'gray.500' }}
                type="email"
            />
            </FormControl>
            <FormControl>
            <FormLabel>Bio</FormLabel>
            <Textarea
                placeholder="Your bio"
                value={inputs.bio}  
                onChange={(e) => setInputs({...inputs, bio: e.target.value})}
                _placeholder={{ color: 'gray.500' }}
                type="text"
            />
            </FormControl>
            <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
                placeholder="password"
                value={inputs.password}
                onChange={(e) => setInputs({...inputs, password: e.target.value})}
                _placeholder={{ color: 'gray.500' }}
                type="password"
            />
            </FormControl>
            {/* <FormControl>
            <FormLabel>LinkedIn URL</FormLabel>
            <Input
                placeholder="https://linkedin.com/janedoe"
                value={inputs.linkedin}
                onChange={(e) => setInputs({...inputs, linkedin: e.target.value})}
                _placeholder={{ color: 'gray.500' }}
                type="text"
            />
            </FormControl>
            <FormControl>
            <FormLabel>Hobbies</FormLabel>
            <Input
                placeholder="Hobbies"
                value={inputs.hobbies}
                onChange={(e) => setInputs({...inputs, hobbies: e.target.value})}
                _placeholder={{ color: 'gray.500' }}
                type="text"
            />
            </FormControl> */}
            <Stack spacing={6} direction={['column', 'row']}>
            <Button
                bg={'red.400'}
                color={'white'}
                w="full"
                _hover={{
                bg: 'red.500',
                }}
                onClick={() => navigate(-1)}>
                Cancel
            </Button>
            <Button
                bg={'green.400'}
                color={'white'}
                w="full"
                _hover={{
                bg: 'green.500',
                }}
                type='submit'
                isLoading={updating}>
                Submit
            </Button>
            </Stack>
        </Stack>
        </Flex>
    </form>
  )
}