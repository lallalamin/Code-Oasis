import { Flex, useColorMode, Image, Link, Box, Button, Text } from '@chakra-ui/react'
import React from 'react'
import { useRecoilValue } from 'recoil'
import userAtom from '../atoms/userAtom'
import { AiFillHome } from 'react-icons/ai'
import { Link as RouterLink } from 'react-router-dom'
import { RxAvatar } from 'react-icons/rx'
import { FiLogOut } from "react-icons/fi"
import useLogout from '../hooks/useLogout'
import authScreenAtom from '../atoms/authAtom'
import { useSetRecoilState } from 'recoil'
import { BsFillChatQuoteFill } from 'react-icons/bs'
import { MdOutlineSettings } from 'react-icons/md'
import { NewspaperOutlineIcon } from 'chakra-ui-ionicons';
import { HomeOutlineIcon } from 'chakra-ui-ionicons';
import { ChatboxEllipsesOutlineIcon } from 'chakra-ui-ionicons';
import { LogoLinkedinIcon } from 'chakra-ui-ionicons';
import { FaDiscord } from "react-icons/fa";

const Footer = () => {
    const {colorMode, toggleColorMode} = useColorMode()
    const user = useRecoilValue(userAtom);
    const setAuthScreen = useSetRecoilState(authScreenAtom);
    
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
                © Website made by Mari Hirota 
            </Text>
            </Flex>
            

            <Flex gap={4} alignItems={"center"} >
                <FaDiscord size={25}/>

                <Link as={RouterLink} to={'https://www.linkedin.com/company/codeoasis/'} target='_blank' >
                    <LogoLinkedinIcon h={22} w={22}></LogoLinkedinIcon>
                </Link>
            </Flex>
        </Flex>
    </>
  )
}
export default Footer