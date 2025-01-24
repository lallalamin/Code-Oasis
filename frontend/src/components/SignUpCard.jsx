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
    console.log(inputsError);
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
      console.log(data);

      if(data.error){
        showToast("Error", data.error, "error");
        return
      }

      localStorage.setItem("user-threads", JSON.stringify(data)); //once you successfully signup, we will send the object or store it in the local storage
      setUser(data);
      
    } catch (error) {
      showToast("Error", error, "error");
    }
  }

  return (
    <Flex
      align={'center'}
      justify={'center'}
      >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'3xl'} textAlign={'center'}>
            Sign up
          </Heading>
          <Text fontSize={'md'} color={'gray.400'}>
           
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.dark')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4} >
            <HStack paddingBottom={4}>
              <Box>
                <FormControl isRequired isInvalid={inputsError.name !== ''}>
                  <FormLabel>Full Name</FormLabel>
                    <Input onBlur={validateName} placeholder='John Doe' type="text" onChange={(e) => setInputs({...inputs, name: e.target.value})} value={inputs.name} />
                    <FormErrorMessage position={'absolute'} fontSize={'xs'} >{inputsError.name}</FormErrorMessage>
                </FormControl>
              </Box>
              <Box>
                <FormControl isRequired>
                  <FormLabel>Username</FormLabel>
                  <Input placeholder='johndoe' type="text" onChange={(e) => setInputs({...inputs, username: e.target.value})} value={inputs.username}/>
                  <FormErrorMessage position={'absolute'} fontSize={'xs'} >{inputsError.name}</FormErrorMessage>
                </FormControl>
              </Box>
            </HStack>
            <FormControl isRequired paddingBottom={4}>
              <FormLabel>Email address</FormLabel>
              <Input placeholder='johndoe@gmail.com' type="email" onChange={(e) => setInputs({...inputs, email: e.target.value})} value={inputs.email}/>
              <FormErrorMessage position={'absolute'} fontSize={'xs'} >{inputsError.name}</FormErrorMessage>
            </FormControl>
            <FormControl  isRequired paddingBottom={4}>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input type={showPassword ? 'text' : 'password'} onChange={(e) => setInputs({...inputs, password: e.target.value})} value={inputs.password}/>
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() => setShowPassword((showPassword) => !showPassword)}>
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage position={'absolute'} fontSize={'xs'} >{inputsError.name}</FormErrorMessage>
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