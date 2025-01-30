import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  FormErrorMessage
} from '@chakra-ui/react'
import { useState } from 'react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { useSetRecoilState } from 'recoil'
import authScreenAtom from '../atoms/authAtom'
import useShowToast from '../hooks/useShowToast'
import userAtom from '../atoms/userAtom'

export default function SignUpCard() {
  const [showPassword, setShowPassword] = useState(false);
  const setAuthScreen = useSetRecoilState(authScreenAtom);
  const [inputsError, setInputsError] = useState({ name: '', username: '', email: '', password: '' });
  const [inputs, setInputs] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
  });

  const showToast = useShowToast();
  const setUser = useSetRecoilState(userAtom);

  const validateName = () => {
    if(inputs.name.match(/[^a-zA-Z]/)){
      setInputsError((prev) => ({
        ...prev,
        name: 'Must not contain special characters',
      }));
    }else{
      setInputsError((prev) => ({
        ...prev,
        name: '',
      }));
    }
  }
  const validateUsername = () => {
    if(inputs.username.match(/[^a-zA-Z0-9]/)){
      setInputsError((prev) => ({
        ...prev,
        username: 'Must not contain special characters',
      }));
    }else{
      setInputsError((prev) => ({
        ...prev,
        username: '',
      }));
    }
  }
  const validateEmail = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!inputs.email.match(emailRegex)) {
      setInputsError((prev) => ({
        ...prev,
        email: 'Please enter a valid email address',
      }));
    } else {
      setInputsError((prev) => ({
        ...prev,
        email: '',
      }));
    } 
  }
  const validatePassword = () => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (!inputs.password.match(passwordRegex)) {
      setInputsError((prev) => ({
        ...prev,
        password: 'Password must be at least 8 characters long and contain at least one letter, one number and one special character',
      }));
    } else {
      setInputsError((prev) => ({
        ...prev,
        password: '',
      }));
    } 
  }

  const handleSignup = async() =>{
    try {
      const res = await fetch("/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs)
      });

      const data = await res.json();

      if(data.error){
        showToast("Error", data.error, "error");
        return
      }

      localStorage.setItem("user-threads", JSON.stringify(data)); //once you successfully signup, we will send the object or store it in the local storage
      setUser(data);
      navigate("/home");
      
    } catch (error) {
      showToast("Error", error, "error");
    }
  }

  return (
    <Flex
      align={'center'}
      justify={'center'}
      position={'relative'}
      >
        {/* <Box
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          w="670px"
          h="670px"
          borderRadius="50%"
          bgGradient="radial(orange.300,rgb(248, 236, 219))"
          filter="blur(40px)"
          zIndex={-1}
          opacity={0.45}
        /> */}
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.dark')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4} >
            <Stack align={'center'} mb={4}>
              <Heading fontSize={'3xl'} textAlign={'center'}>
                Sign up
              </Heading>
              <Text fontSize={'md'} color={'gray.400'}>
              
              </Text>
            </Stack>
            <HStack paddingBottom={4}>
              <Box>
                <FormControl isRequired isInvalid={inputsError.name !== ''}>
                  <FormLabel>Full Name</FormLabel>
                    <Input onBlur={validateName} placeholder='John Doe' type="text" onChange={(e) => setInputs({...inputs, name: e.target.value})} value={inputs.name} />
                    <FormErrorMessage position={'absolute'} fontSize={'xs'} >{inputsError.name}</FormErrorMessage>
                </FormControl>
              </Box>
              <Box>
                <FormControl isRequired isInvalid={inputsError.username !== ''} >
                  <FormLabel>Username</FormLabel>
                  <Input onBlur={validateUsername} placeholder='johndoe' type="text" onChange={(e) => setInputs({...inputs, username: e.target.value})} value={inputs.username}/>
                  <FormErrorMessage position={'absolute'} fontSize={'xs'} >{inputsError.username}</FormErrorMessage>
                </FormControl>
              </Box>
            </HStack>
            <FormControl isRequired paddingBottom={4} isInvalid={inputsError.email !== ''}>
              <FormLabel>Email address</FormLabel>
              <Input onBlur={validateEmail} placeholder='johndoe@gmail.com' type="email" onChange={(e) => setInputs({...inputs, email: e.target.value})} value={inputs.email}/>
              <FormErrorMessage position={'absolute'} fontSize={'xs'} >{inputsError.email}</FormErrorMessage>
            </FormControl>
            <FormControl  isRequired paddingBottom={8} isInvalid={inputsError.password !== ''} >
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input onBlur={validatePassword} type={showPassword ? 'text' : 'password'} onChange={(e) => setInputs({...inputs, password: e.target.value})} value={inputs.password}/>
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() => setShowPassword((showPassword) => !showPassword)}>
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage position={'absolute'} fontSize={'xs'} >{inputsError.password}</FormErrorMessage>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={useColorModeValue("gray.600", "gray.700")}
                color={'white'}
                _hover={{
                  bg: useColorModeValue("gray.700", "gray.800"),
                }}
                onClick={handleSignup}>
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={'center'}>
                Already a user? <Link color={'blue.400'} onClick={() => setAuthScreen("login")}>Login</Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}