import React, {useEffect, useState, useContext} from 'react';
import { LOGIN } from '../utils/graphql/mutation/post';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { AuthContext } from '../utils/context/auth-context';
import Link from 'next/link'
import { Link as ChakraLink } from "@chakra-ui/react";

import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  Box,
  Avatar,
  FormLabel,
  chakra,
  FormControl,
  FormHelperText,
  Text,
  Image
} from "@chakra-ui/react";
import { FaEyeSlash,FaEye } from "react-icons/fa";


const Login = () => {


  const [login, {data,loading,error}] = useMutation(LOGIN)

const [userName, setUserName] = useState('');
const [password, setPassword] = useState('');
// const [showPassword, setShowPassword] = useState(false);

const router = useRouter();

const authCtx = useContext(AuthContext)

// const handleShowClick = () => setShowPassword(!showPassword);

useEffect(() => {
    if(data){
        authCtx.setUserDetails(data.login.user)
        authCtx.setAuthState(data.login.jwt)
        router.push("/")
        console.log("pushhhh")
    }
},[data])

const handleUsername = (event) => {
    setUserName(event.target.value);
};

const handlePassword = (event) => {
  console.log(event.target.value)  
  setPassword(event.target.value);
};

async function handleSubmitForm(event) {
    event.preventDefault();


    if (userName !== '' && password !== '') {

        const variables = {
            input:{
                identifier: userName,
                password: password
            }
        }
        login({variables})
        console.log("Before Variables",data)
        
        setUserName('')
        setPassword('')
        console.log('Fields not empty');

    } else {
        console.log('Fields should not be empty');
        return
    }
    
}


  return (
    <Box
      bgImage="url('/images/login_banner.jpg')"
      bgPosition={["","center"]}
      bgRepeat="no-repeat"
      bgSize="cover"
    >
        <Box d="flex" justifyContent={["center","end"]} alignItems="center" minW={{ base: "90%", md: "539px" }} mr={["0","118px"]}>
          <form onSubmit={handleSubmitForm}>
            <Stack
              mt="80px"
              mb="80px"
              width={["390px","510px"]}
              height="641px"
              spacing={4}
              px="44px"
              pt="30px"
              pb="60px"
              backgroundColor={["rgba(255,255,255,0.6)","#fff"]}
              boxShadow="md"
              borderRadius={25}
            >
              <Flex
                flexDirection="row"
                justifyContent="space-between"
              >
                <Box>
                  <Text
                    fontWeight="400"
                    fontSize="21px"
                    lineHeight="32px"
                  >
                    Welcome to <chakra.span color="#779341" fontWeight="600" lineHeight="32px" fontSize="21px">LOREM</chakra.span>
                  </Text>
                </Box>
                <Box>
                  <Text fontSize="13px" color="#8D8D8D" lineHeight="19.5px" mb="0">No Account ?</Text>
                  <ChakraLink fontSize="14px" lineHeight="19.5px" color="#779341" href="/register">
                    {/* <Text > */}
                      Signup
                    {/* </Text> */}
                  </ChakraLink>
                </Box>
              </Flex>
              <Text
                lineHeight="82px"
                fontSize="55px"
                fontWeight="500"
                mt="0"
                mb="40px"
              >
                Sign In
              </Text>
              <Box d="flex">
                <Image 
                  mr={["10px","20px"]}
                  borderRadius={9}
                  src='/images/google_btn.jpg'
                  height="55px"
                  width={["200px","298px"]}
                />
                <Image 
                  borderRadius={9}
                  src='/images/facebook_btn.jpg'
                  height="55px"
                  width="60px"
                />
                <Image 
                  borderRadius={9}
                  src='/images/apple_btn.jpg'
                  height="55px"
                  width="60px"
                />
              </Box>
              <FormControl>
                <FormLabel
                  mt="25px"
                  htmlFor='username'
                  fontSize="16px"
                  lineHeight="24px"
                >
                  Enter your username or email address
                </FormLabel>
                <Input bg="#fff" type='text' placeholder='Username' value={userName} onChange={handleUsername} name="username" borderColor="#ADADAD"/>
              </FormControl>
              <FormControl>
                <FormLabel
                    mt="10px" 
                    htmlFor='username'
                    fontSize="16px"
                    lineHeight="24px"
                  >
                    Enter your password
                  </FormLabel>
                  <Input
                    borderColor="#ADADAD"
                    type="password"
                    placeholder="Password"
                    bg="#fff"
                    value={password} 
                    onChange={handlePassword}
                  />
                <FormHelperText textAlign="right" color="#4285F4">
                  <Link href="/forgotPassword" style={{border:"none !important"}}>Forgot password?</Link>
                </FormHelperText>
              </FormControl>
              <Box d="flex" justifyContent="flex-end" mt="30px !important" mb="40px !important">
                <Button
                  borderRadius={8}
                  type="submit"
                  variant="solid"
                  color="#fff"
                  width="236px"
                  bg="#779341"
                  _hover={{bg:"#779341",color:"#fff"}}
                >
                  Login
                </Button>
              </Box>
            </Stack>
          </form>
        </Box>
    </Box>
  );
};

export default Login;