import React, {useEffect, useState, useContext} from 'react';
import { LOGIN } from '../utils/graphql/mutation/post';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { AuthContext } from '../utils/context/auth-context';
import Link from 'next/link'
import { Link as ChakraLink } from "@chakra-ui/react";
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import {
  Flex,
  Button,
  Stack,
  Box,
  chakra,
  FormControl,
  Text,
} from "@chakra-ui/react";

import TextField from './TextField';
import ImageField from './ImageField';
import InputLabel from './InputLabel';

import ReactGA from "react-ga4";

const Login = () => {


const [login, {data,loading,error}] = useMutation(LOGIN)


const router = useRouter();

const authCtx = useContext(AuthContext)


const eventTrack = (category, action, label) => {
  ReactGA.event({
    category: category,
    action: action,
    label: label,
  })
}
useEffect(() => {
  if(loading){
    eventTrack("authentication","sign_in_requested","login button clicked")
  }
},[loading])


useEffect(() => {
    
  if(data){
        eventTrack("authentication","sign_in","Success Signed in")
        authCtx.setUserDetails(data.login.user)
        authCtx.setAuthState(data.login.jwt)
        router.push("/")
    }
    
},[data])




const validate = Yup.object({
  username: Yup.string().required('Required'),
  password: Yup.string().required('Required'),
});




  return (
    <Box
      bgImage="url('/images/login_banner.jpg')"
      bgPosition={["","center"]}
      bgRepeat="no-repeat"
      bgSize="cover"
    >
        <Box d="flex" justifyContent={["center","end"]} alignItems="center" minW={{ base: "90%", md: "539px" }} mr={["0","118px"]}>
          <Formik
            initialValues={{
              username: '',
              password: '',
            }}
            validationSchema={validate}
            onSubmit={(values) => {
            const variables = {
                input: {
                    identifier: values.username,
                    password: values.password
                }
            };
            login({ variables });

          }}
          >
          <Form>
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
                  <Link href="/register">
                    <ChakraLink fontSize="14px" lineHeight="19.5px" color="#779341">
                      Sign up
                    </ChakraLink>
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
                Sign In
              </Text>
              <Box d="flex">
                <ImageField 
                  mr={["10px","20px"]}
                  borderRadius={9}
                  src='/images/google_btn.jpg'
                  height="55px"
                  width={["200px","298px"]}
                />
                <ImageField 
                  borderRadius={9}
                  src='/images/facebook_btn.jpg'
                  height="55px"
                  width="60px"
                />
                <ImageField 
                  borderRadius={9}
                  src='/images/apple_btn.jpg'
                  height="55px"
                  width="60px"
                />
              </Box>
              <Box mt="25px">
                <FormControl>
                  <InputLabel label="Enter your username or email address" htmlFor="username"/>
                  <TextField type='text' placeholder='Username' name="username" />
                </FormControl>
                <FormControl>
                  <InputLabel label="Enter your password" htmlFor="password"/>
                  <TextField type="password" placeholder="Password" name="password" />
                </FormControl>
              </Box>
              <Link href="/forgotPassword">
                  <ChakraLink fontSize="14px" border="none !important" textAlign="right" color="#4285F4">
                    Forgot Password
                  </ChakraLink>
              </Link>
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
          </Form>
          </Formik>
        </Box>
    </Box>
  );
};

export default Login;