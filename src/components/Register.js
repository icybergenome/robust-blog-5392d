import React, {useEffect, useState, useContext} from 'react';
import { REGISTER } from '../utils/graphql/mutation/post';
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


  const [register,{loading,data,error}] = useMutation(REGISTER)

  const [userName, setUserName] = useState('')
  const [emailAddress, setEmailAddress] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  
  const router = useRouter();
  
  const authCtx = useContext(AuthContext)
  
  useEffect(() => {
      if(data){
          authCtx.setUserDetails(data.register.user)
          authCtx.setAuthState(data.register.jwt)
          router.push("/")
      }
  },[data])
  
  const handleUserName = (event) => {
    console.log("aaa")
    setUserName(event.target.value)
  }
  
  const handleEmail = (event) => {
    setEmailAddress(event.target.value)
  }
  
  const handlePassword = (event) => {
    setPassword(event.target.value)
  }
  
  const handleConfirmPassword = (event) => {
    setConfirmPassword(event.target.value)
  }
  
  async function handleSubmitForm (event) {
    event.preventDefault();
    
  
    if(password == '' && confirmPassword == ''){
      console.log('Passwords should not be empty');
      return
    }
    if(password !== confirmPassword){
      console.log('Passwords should be same');
      return
    }
  
    if(userName !== '' && (emailAddress.includes('@') && emailAddress !== '')){
      const variables = {
        input:{
          username: userName,
          email: emailAddress,
          password: password
        }
      }
    
      register({variables});
      
      
      
      setEmailAddress('')
      setUserName('')
      setPassword('')
      setConfirmPassword('')
      console.log('Fields not empty');
    }else{
      console.log("fields should not be empty")
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
              height="750px"
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
                  <Text fontSize="13px" color="#8D8D8D" lineHeight="19.5px" mb="0">Have An Account ?</Text>
                  <Link href="/login">
                    <Text fontSize="14px" lineHeight="19.5px" color="#779341"> Sign in</Text>
                  </Link>
                </Box>
              </Flex>
              <Text
                lineHeight="82px"
                fontSize="55px"
                fontWeight="500"
                mt="0"
                mb="40px"
              >
                Sign Up
              </Text>
              
              <FormControl>
                <FormLabel
                  mt="25px"
                  htmlFor='username'
                  fontSize="16px"
                  lineHeight="24px"
                >
                  Enter your email address
                </FormLabel>
                <Input bg="#fff" type='text' placeholder='Username' value={emailAddress} onChange={handleEmail} name="username" borderColor="#ADADAD"/>
              </FormControl>
              <Box d="inline-flex">
              <FormControl mr="20px">
                <FormLabel
                  mt="10px"
                  htmlFor='username'
                  fontSize="16px"
                  lineHeight="24px"
                >
                  User name
                </FormLabel>
                <Input width="98%" bg="#fff" type='text' placeholder='User name' value={userName} onChange={handleUserName} name="username" borderColor="#ADADAD"/>
              </FormControl>
              <FormControl>
                <FormLabel
                  mt="10px"
                  htmlFor='username'
                  fontSize="16px"
                  lineHeight="24px"
                >
                  Contact Number
                </FormLabel>
                <Input width="98%" pl={["3px",""]} bg="#fff" type='text' placeholder='Contact Number' name="username" borderColor="#ADADAD"/>
              </FormControl>
              </Box>
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
              </FormControl>
              <FormControl>
                <FormLabel
                    mt="10px" 
                    htmlFor='username'
                    fontSize="16px"
                    lineHeight="24px"
                  >
                    Confirm your password
                  </FormLabel>
                  <Input
                    borderColor="#ADADAD"
                    type="password"
                    placeholder="Confirm Password"
                    bg="#fff"
                    value={confirmPassword} 
                    onChange={handleConfirmPassword}
                  />
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
                  Sign up
                </Button>
              </Box>
            </Stack>
          </form>
        </Box>
    </Box>
  );
};

export default Login;