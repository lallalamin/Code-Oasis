import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link,
  } from '@chakra-ui/react'
  import { useState } from 'react'
  import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { useSetRecoilState } from 'recoil';
import authScreenAtom from '../atoms/authAtom';
import useShowToast from '../hooks/useShowToast';
import userAtom from '../atoms/userAtom';
import { useNavigate } from 'react-router-dom';

  
  export default function LoginCard() {
    const [showPassword, setShowPassword] = useState(false);
    const setAuthScreen = useSetRecoilState(authScreenAtom);
    const setUser = useSetRecoilState(userAtom);
    const showToast = useShowToast();
    const [inputs, setInputs] = useState({
      username: "",
      password: "",
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const handleLogin = async() => {
      setLoading(true);
      try {
        const res = await fetch("/api/users/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...inputs,
            timezone: timezone,
          }),
        })

        const data = await res.json();

        if (data.error) {
          showToast("Error", data.error, "error");
          return;
        }
        localStorage.setItem("user-threads", JSON.stringify(data));
        setUser(data);
        navigate("/home");

      } catch (error) {
        showToast("Error", error, "error");
      } finally {
        setLoading(false);
      }
    }
  
    return (
      <Flex
        align={'center'}
        justify={'center'}
        position={"relative"}
        >
        {/* <Box
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          w="500px"
          h="500px"
          borderRadius="50%"
          bgGradient="radial(orange.300,rgb(248, 236, 219))"
          filter="blur(40px)"
          zIndex={-1}
          opacity={0.8}
        /> */}
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.dark')}
            boxShadow={'lg'}
            p={8}
            width={{
                base: "full",
                sm: "400px"
            }}>
            <Stack spacing={4}>
              <Stack align={'center'}>
                <Heading fontSize={'3xl'} textAlign={'center'}>
                  Login
                </Heading>
                <Text fontSize={'lg'} color={'gray.600'}>
                </Text>
              </Stack>
              <FormControl isRequired>
                <FormLabel>Username</FormLabel>
                <Input type="text" value={inputs.username} onChange={(e) => setInputs({...inputs, username: e.target.value})}/>
              </FormControl>
              <FormControl  isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input type={showPassword ? 'text' : 'password'} value={inputs.password} onChange={(e) => setInputs({...inputs, password: e.target.value})}/>
                  <InputRightElement h={'full'}>
                    <Button
                      variant={'ghost'}
                      onClick={() => setShowPassword((showPassword) => !showPassword)}>
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  loadingText="Logging in"
                  size="lg"
                  bg={useColorModeValue("gray.600", "gray.700")}
                  color={'white'}
                  _hover={{
                    bg: useColorModeValue("gray.700", "gray.800"),
                  }}
                  onClick={handleLogin}
                  isLoading={loading}>
                  Login
                </Button>
              </Stack>
              {/* <Stack pt={6}>
                <Text align={'center'}>
                  Don&apos;t have an account? <Link color={'blue.400'} onClick={() => setAuthScreen("signup")}>Sign up</Link>
                </Text>
              </Stack> */}
            </Stack>
          </Box>
        </Stack>
      </Flex>
    )
  }