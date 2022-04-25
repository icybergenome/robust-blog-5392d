import React, {useEffect, useState, useContext} from 'react';
import { LOGIN } from '../utils/graphql/mutation/post';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { AuthContext } from '../utils/context/auth-context';
import Link from 'next/link'
import { Link as ChakraLink } from "@chakra-ui/react";
import { ForgotPassword } from '../utils/graphql/mutation/post'
import TextField from './TextField';
import InputLabel from './InputLabel';
import ReactGA from "react-ga4";

import { Formik, Form } from 'formik';
import * as Yup from 'yup';


import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  Box,
  FormLabel,
  chakra,
  FormControl,
  FormHelperText,
  Text,
  Image
} from "@chakra-ui/react";


const ForgotPassord = () => {


const [forgotPass, {data,loading,error}] = useMutation(ForgotPassword)

const router = useRouter();

const eventTrack = (category, action, label) => {
  ReactGA.event({
    category: category,
    action: action,
    label: label,
  })
}


useEffect(() => {
    if(loading){
      eventTrack("authentication","forgot_password_requested","Forgot Password Requested")
    }
},[loading])


useEffect(() => {
    if(data){
        if(data.forgotPassword.ok){
          eventTrack("authentication","forgot_password","Forgot Password Success")
          router.push('/resetPassword')
        }
    }
},[data])

const validate = Yup.object({
  email: Yup.string().email('Email is invalid').required('Required'),
});

  return (
    <Box
      bgImage="url('/images/login_banner.jpg')"
      bgPosition={["","center"]}
      bgRepeat="no-repeat"
      bgSize="cover"
      position="fixed"
      height="100%"
      width="100%"
    >
        <Box d="flex" justifyContent={["center","end"]} alignItems="center" minW={{ base: "90%", md: "539px" }} mr={["0","118px"]}>
          <Formik
            initialValues={{
              email: '',
            }}
            validationSchema={validate}
            onSubmit={(values) => {
            const variables = {
                email: values.email
            };
            forgotPass({ variables });

          }}
          >
          <Form>
            <Stack
              mt={["80px","170px"]}
              mb="80px"
              width={["390px","510px"]}
              height="460px"
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
              </Flex>
              <Text
                lineHeight="82px"
                fontSize="55px"
                fontWeight="500"
                mt="0"
                mb="40px"
              >
                Forgot Password
              </Text>
              <FormControl>
                <InputLabel htmlFor="email" label="Enter your email address"/>
                <TextField type='text' placeholder='Email' name="email" />
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
                  Submit
                </Button>
              </Box>
            </Stack>
          </Form>
          </Formik>
        </Box>
    </Box>
  );
};

export default ForgotPassord;