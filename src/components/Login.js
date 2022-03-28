import React, {useEffect, useState, useContext} from 'react';
import { LOGIN } from '../utils/graphql/mutation/post';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { AuthContext } from '../utils/context/auth-context';
import Link from 'next/link'
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Avatar,
  FormControl,
  FormHelperText,
  InputRightElement
} from "@chakra-ui/react";
import { FaEyeSlash,FaEye } from "react-icons/fa";

import { AiOutlineUser } from 'react-icons/ai'


const Login = () => {

const [login, {data,loading,error}] = useMutation(LOGIN)

const [userName, setUserName] = useState('');
const [password, setPassword] = useState('');
const [showPassword, setShowPassword] = useState(false);

const router = useRouter();

const authCtx = useContext(AuthContext)

const handleShowClick = () => setShowPassword(!showPassword);

useEffect(() => {
    if(data){
        authCtx.setUserDetails(data.login.user)
        authCtx.setAuthState(data.login.jwt)
        router.push("/")
    }
},[data])

const handleUsername = (event) => {
    setUserName(event.target.value);
};

const handlePassword = (event) => {
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
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      backgroundColor="gray.200"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
         
        <Avatar bg="linear-gradient(101.12deg, #EB1484 27.35%, #C91CC3 99.99%, #C81CC5 100%, #C81CC5 100%)" />
        <Heading color="#DA18A3">Welcome Back, Please Login</Heading>
        <Box minW={{ base: "90%", md: "468px" }}>
          <form onSubmit={handleSubmitForm}>
            <Stack
              spacing={4}
              p="1rem"
              backgroundColor="whiteAlpha.900"
              boxShadow="md"
            >
              <FormControl>
                <Input pl="43px" type='text' placeholder='Username' value={userName} onChange={handleUsername} />
              </FormControl>
              <FormControl>
                <InputGroup>
                  <Input
                    pl="43px"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password} onChange={handlePassword}
                  />
                  <InputRightElement 
                    width="4.5rem"
                  >
                    <Button h="1.75rem" size="sm" bg="gray.100" _hover={{bg:"gray.100", color: "#DA18A3"}} onClick={handleShowClick}>
                        {showPassword ? <FaEye /> : <FaEyeSlash />}
                    </Button>
                </InputRightElement>
                </InputGroup>
                <FormHelperText textAlign="right">
                  <Link href="/forgotPassword">Forgot password?</Link>
                </FormHelperText>
              </FormControl>
              <Button
                borderRadius={8}
                type="submit"
                variant="solid"
                color="#fff"
                width="full"
                bg="linear-gradient(101.12deg, #EB1484 27.35%, #C91CC3 99.99%, #C81CC5 100%, #C81CC5 100%)"
                _hover={{bg:"linear-gradient(101.12deg, #EB1484 27.35%, #C91CC3 99.99%, #C81CC5 100%, #C81CC5 100%)",color:"#fff"}}
              >
                Login
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
      <Box>
        Doesn't Have An Account?{" "}
        <Link href="/register">
          Sign Up
        </Link>
      </Box>
    </Flex>
  );
};

export default Login;