import { Flex, useColorMode, Image, Link, Box, Button, Text, useToast } from '@chakra-ui/react'
import React from 'react'
import { useRecoilValue } from 'recoil'
import userAtom from '../atoms/userAtom'
import { Link as RouterLink } from 'react-router-dom'
import authScreenAtom from '../atoms/authAtom'
import { useSetRecoilState } from 'recoil'
import { LogoLinkedinIcon } from 'chakra-ui-ionicons';
import { LogoInstagramIcon } from 'chakra-ui-ionicons'
import { FaDiscord } from "react-icons/fa";

const Footer = () => {
    const {colorMode, toggleColorMode} = useColorMode()
    const user = useRecoilValue(userAtom);
    const setAuthScreen = useSetRecoilState(authScreenAtom);
    const toast = useToast();

    const copyEmail = () => {
        const email = "hello.codeoasis@gmail.com";
        navigator.clipboard.writeText(email).then(() =>{
            toast({
                title: 'Copied.',
                description: "Email Address copied to clipboard.",
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
        });
    };

    const copyDiscord = () => {
        const discordInviteLink = "https://discord.gg/uRZ6KkTGbx";
        navigator.clipboard.writeText(discordInviteLink).then(() =>{
            toast({
                title: 'Copied.',
                description: "Discord Invite Link copied to clipboard.",
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
        });
    };
    
  return (
    <>
        <Flex justifyContent={"space-between"} mt={6} mb="2" alignItems={"center"}>
            <Image 
                cursor={"pointer"}
                alt='logo'
                w={20}
                src={colorMode === "dark" ? "/light-logo/android-chrome-192x192.png" : "/dark-logo/android-chrome-192x192.png"}
                onClick={toggleColorMode}
            />


            <Flex gap={4} alignItems={"center"}> 
                <Text fontSize={"sm"}>
                    Privacy Policy
                </Text>
                <Text fontSize={"sm"}>
                    Term of Service
                </Text>
                <Box cursor={"pointer"} onClick={copyEmail}>
                    <Text fontSize={"sm"}>
                        Contact Us
                    </Text>
                </Box>
                
            </Flex>
            

            <Flex gap={4} alignItems={"center"} >
                <FaDiscord size={25}/>
                <Link as={RouterLink} to={'https://www.instagram.com/codeoasis.official'} target='_blank' >
                    <LogoInstagramIcon h={22} w={22}></LogoInstagramIcon>
                </Link>
                <Link as={RouterLink} to={'https://www.linkedin.com/company/codeoasis/'} target='_blank' >
                    <LogoLinkedinIcon h={22} w={22}></LogoLinkedinIcon>
                </Link>
            </Flex>
        </Flex>
    </>
  )
}
export default Footer