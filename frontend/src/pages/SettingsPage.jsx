import React from 'react'
import { Button, Text, Flex, Box, Image } from '@chakra-ui/react'
import useShowToast from '../hooks/useShowToast'
import useLogout from '../hooks/useLogout'

const SettingsPage = () => {
    const showToast = useShowToast();
    const logout = useLogout();
    const freezeAccount = async() => {
        if (!window.confirm("Are you sure you want to freeze your account?")) return;

        try {
            const res = await fetch("/api/users/freeze", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await res.json();
            if (data.error) {
                showToast("Error", data.error, "error");
                return;
            }
            if(data.success) {
                await logout();
                showToast("Success", "Account frozen successfully", "success");
            }

        } catch (error) {
            showToast("Error", error.message, "error");
        }
    }
  return (
    <>
        <Flex gap={2} flexDirection={"row"}>
            <Box>
                <Text my={1} fontWeight={"bold"}>Freeze Your Account</Text>
                <Text my={2}>You can unfreeze your account anytime by logging into your account.</Text>
                <Button my={7} size={"sm"} colorScheme='red' onClick={freezeAccount}>Freeze Account</Button>
            </Box>
            <Image src="/characters/Momo-Froze.png" alt='post image' w={{base: "120px", md: "200px"}} h={{base: "120px", md: "200px"}} />
        </Flex>
        
    </>
  )
}

export default SettingsPage