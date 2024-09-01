import { Flex, useColorMode, Image } from '@chakra-ui/react'
import React from 'react'

const Header = () => {
    const {colorMode, toggleColorMode} = useColorMode()

  return (
    <>
        <Flex justifyContent={"center"} mt={6} mb="12">
            <Image 
                cursor={"pointer"}
                alt='logo'
                w={20}
                src={colorMode === "dark" ? "/light-logo/android-chrome-192x192.png" : "/dark-logo/android-chrome-192x192.png"}
                onClick={toggleColorMode}
            />
        </Flex>
    </>
  )
}

export default Header