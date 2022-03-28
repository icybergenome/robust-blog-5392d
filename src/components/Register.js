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
  InputLeftElement,
  chakra,
  Box,
  Avatar,
  FormControl,
  FormHelperText,
  InputRightElement
} from "@chakra-ui/react";
import { FaEyeSlash,FaEye } from "react-icons/fa";



const Register = () => {

const [register,{loading,data,error}] = useMutation(REGISTER)

const [userName, setUserName] = useState('')
const [emailAddress, setEmailAddress] = useState('')
const [password, setPassword] = useState('')
const [confirmPassword, setConfirmPassword] = useState('')

const [showPassword, setShowPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false);

const router = useRouter();

const handleShowPass = () => setShowPassword(!showPassword);
const handleShowConfirmPass = () => setShowConfirmPassword(!showConfirmPassword);

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
        <Heading color="#DA18A3">Account Registration</Heading>
        <Box minW={{ base: "90%", md: "468px" }}>
          <form onSubmit={handleSubmitForm}>
            <Stack
              spacing={4}
              p="1rem"
              backgroundColor="whiteAlpha.900"
              boxShadow="md"
            >
              <FormControl>
                <Input pl="43px" type='text' placeholder='Username' value={userName} onChange={handleUserName} />
              </FormControl>
              <FormControl>
                <Input pl="43px" type='email' placeholder='Email' value={emailAddress} onChange={handleEmail} />
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
                    <Button h="1.75rem" size="sm" bg="gray.100" _hover={{bg:"gray.100", color: "#DA18A3"}} onClick={handleShowPass}>
                        {showPassword ? <FaEye /> : <FaEyeSlash />}
                    </Button>
                </InputRightElement>
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <Input
                    pl="43px"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    value={confirmPassword} onChange={handleConfirmPassword}
                  />
                  <InputRightElement 
                    width="4.5rem"
                  >
                    <Button h="1.75rem" size="sm" bg="gray.100" _hover={{bg:"gray.100", color: "#DA18A3"}} onClick={handleShowConfirmPass}>
                        {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                    </Button>
                </InputRightElement>
                </InputGroup>
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
                Register
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
      <Box>
      Already have an account?{" "}
        <Link href="/login">
           Login
        </Link>
      </Box>
    </Flex>
  );
};

export default Register;