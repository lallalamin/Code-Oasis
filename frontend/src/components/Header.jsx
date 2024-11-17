import { Flex, useColorMode, Image, Link } from '@chakra-ui/react'
import React from 'react'
import { useRecoilValue } from 'recoil'
import userAtom from '../atoms/userAtom'
import { AiFillHome } from 'react-icons/ai'
import { Link as RouterLink } from 'react-router-dom'
import { RxAvatar } from 'react-icons/rx'

const Header = () => {
    const {colorMode, toggleColorMode} = useColorMode()
    const user = useRecoilValue(userAtom);
  return (
    <>
        <Flex justifyContent={"space-between"} mt={6} mb="12">
            {user && (
              <Link as={RouterLink} to={'/'} >
                <AiFillHome size={24}></AiFillHome>
              </Link>
            )}
            <Image 
                cursor={"pointer"}
                alt='logo'
                w={20}
                src={colorMode === "dark" ? "/light-logo/android-chrome-192x192.png" : "/dark-logo/android-chrome-192x192.png"}
                onClick={toggleColorMode}
            />

            {user && (
              <Link as={RouterLink} to={`/${user.username}`} >
                <RxAvatar size={24}></RxAvatar>
              </Link>
            )}
        </Flex>
    </>
  )
}

export default Header