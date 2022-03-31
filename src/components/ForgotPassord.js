import React, {useEffect, useState, useContext} from 'react';
import { LOGIN } from '../utils/graphql/mutation/post';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { AuthContext } from '../utils/context/auth-context';
import Link from 'next/link'
import { Link as ChakraLink } from "@chakra-ui/react";
import { ForgotPassword } from '../utils/graphql/mutation/post'

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


const ForgotPassord = () => {


const [resetPassword, {data,loading,error}] = useMutation(ForgotPassword)

const [emailAddress, setEmailAddress] = useState('')

const router = useRouter();

const authCtx = useContext(AuthContext)


useEffect(() => {
    if(data){
        if(data.forgotPassword.ok){
          router.push('/passwordCode')
        }
    }
},[data])

const handleEmail = (event) => {
  setEmailAddress(event.target.value)
};

async function handleSubmitForm(event) {
    event.preventDefault();


    if (emailAddress.includes('@') && emailAddress !== '') {

        const variables = {
            email: emailAddress
        }
        resetPassword({variables})
        console.log("Before Variables",data)
        
        setEmailAddress('')
        console.log('Fields not empty');

    } else {
        console.log('Email should not be empty');
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
                Reset Password
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
          </form>
        </Box>
    </Box>
  );
};

export default ForgotPassord;