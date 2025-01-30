import { Flex, useColorMode, Image, Link, Box, Button, Icon } from '@chakra-ui/react'
import { Menu, MenuButton, MenuList, MenuItem, MenuDivider, MenuGroup } from '@chakra-ui/react'
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
import { MdOutlineSettings } from 'react-icons/md'
import { NewspaperOutlineIcon } from 'chakra-ui-ionicons';
import { HomeOutlineIcon } from 'chakra-ui-ionicons';
import { ChatboxEllipsesOutlineIcon } from 'chakra-ui-ionicons';
import { Switch } from '@chakra-ui/react'
import { FaMoon, FaSun } from "react-icons/fa"

const Header = () => {
    const {colorMode, toggleColorMode} = useColorMode()
    const user = useRecoilValue(userAtom);
    const logout = useLogout();
    const setAuthScreen = useSetRecoilState(authScreenAtom);
  return (
    <>
        <Flex justifyContent={"space-between"} mt={6} mb="12" alignItems={"center"}>
            {user && (
              <Flex gap={4} alignItems={"center"}> 
              <Menu>
                <MenuButton as={Button} colorScheme="pink" size={"sm"}>
                  Profile
                </MenuButton>
                <MenuList>
                  <MenuGroup title="Profile">
                    <MenuItem>My Account</MenuItem>
                    <MenuItem>Payments </MenuItem>
                  </MenuGroup>
                  <MenuDivider />
                  <MenuGroup title="Help">
                    <MenuItem>Docs</MenuItem>
                    <MenuItem>FAQ</MenuItem>
                  </MenuGroup>
                </MenuList>
              </Menu>
                <Link as={RouterLink} to={`/settings`} >
                  <MdOutlineSettings size={22}></MdOutlineSettings>
                </Link>
                <Button size={"xs"} onClick={logout}>
                    Logout 
                    <Box ml={2}>
                      <FiLogOut/> 
                    </Box>
                </Button>
                
                <Flex alignItems="center" gap={2}>
                    <Icon as={colorMode === "dark" ? FaMoon : FaSun} boxSize={5} />
                    <Switch
                        isChecked={colorMode === "dark"}
                        onChange={toggleColorMode}
                        size="md"
                        colorScheme="blue"
                    />
                </Flex>
              </Flex>
            )}

            {!user && (
              <Button size={"sm"} as={RouterLink} to={'/auth'} onClick={() => setAuthScreen("login")}>
                Login
              </Button>
            )}

            <Image 
                cursor={"pointer"}
                alt='logo'
                w={20}
                src={colorMode === "dark" ? "/light-logo/android-chrome-192x192.png" : "/dark-logo/android-chrome-192x192.png"}
            />

            

            {user && (
              <Flex gap={4} alignItems={"center"}>
                <Link as={RouterLink} to={'/home'} >
                  <HomeOutlineIcon h={22} w={22}></HomeOutlineIcon>
                </Link>
                <Link as={RouterLink} to={`/${user.username}`} >
                  <RxAvatar size={24}></RxAvatar>
                </Link>
                <Link as={RouterLink} to={`/chat`} >
                  <ChatboxEllipsesOutlineIcon h={22} w={22}></ChatboxEllipsesOutlineIcon>
                </Link>
                <Link as={RouterLink} to={`/news`} >
                  <NewspaperOutlineIcon h={20} w={20}></NewspaperOutlineIcon>
                </Link>
                
              </Flex>
            )}

            {!user && (
              <Button size={"sm"} as={RouterLink} to={'/auth'} onClick={() => setAuthScreen("signup")} >
                  Sign up
              </Button>
            )}
        </Flex>
    </>
  )
}

export default Header