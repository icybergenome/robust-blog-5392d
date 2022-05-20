import React, { useEffect, useState, useContext } from 'react';
import { REGISTER } from '../utils/graphql/mutation/post';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { AuthContext } from '../utils/context/auth-context';
import { Link as ChakraLink } from '@chakra-ui/react';
import Link from 'next/link';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import ReactGA from "react-ga4";

import {
    Flex,
    Button,
    Stack,
    Box,
    chakra,
    FormControl,
    Text,
} from '@chakra-ui/react';

import TextField from './TextField';
import InputLabel from './InputLabel';

const Register = () => {
    const [register, { loading, data, error }] = useMutation(REGISTER);


    const validate = Yup.object({
        email: Yup.string().email('Email is invalid').required('Required'),
        username: Yup.string().min(6, 'Must be atleast 6 characters').required('Required'),
        password: Yup.string().min(6, 'Password must be atleast 6 characters').required('Required'),
        confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm Password is required')
    });

    const router = useRouter();

    const authCtx = useContext(AuthContext);

    const eventTrack = (category, action, label) => {
        ReactGA.event({
          category: category,
          action: action,
          label: label,
        })
      }

      useEffect(() => {
        if(loading){
          eventTrack("registration","sign_up_requested","register button clicked")
        }
      },[loading])


    useEffect(() => {
        if (data) {
            eventTrack("registration","sign_up","Success signed up")
            authCtx.setUserDetails(data.register.user);
            authCtx.setAuthState(data.register.jwt);
            router.push('/');
        }
    }, [data]);

    return (
        <Box height="100%">
        <Box bgImage="url('/images/login_banner.jpg')" bgPosition={['', 'center']} bgRepeat="no-repeat" bgSize="cover" position="fixed" width="100%" height="100%">
            <Box d="flex" justifyContent={['center', 'end']} alignItems="center" minW={{ base: '90%', md: '539px' }} mr={['0', '118px']}>
                <Formik
                    initialValues={{
                        email: '',
                        username: '',
                        password: '',
                        confirmPassword: ''
                    }}
                    validationSchema={validate}
                    onSubmit={(values) => {
                      const variables = {
                          input: {
                              username: values.username,
                              email: values.email,
                              password: values.password
                          }
                      };
                      register({ variables });

                    }}
                >
                    <Form>
                        <Stack
                            mt="40px"
                            mb="40px"
                            width={['390px', '510px']}
                            height="620px"
                            spacing={4}
                            px="44px"
                            pt="30px"
                            pb="60px"
                            backgroundColor={['rgba(255,255,255,0.6)', '#fff']}
                            boxShadow="md"
                            borderRadius={25}
                        >
                            <Flex flexDirection="row" justifyContent="space-between">
                                <Box>
                                    <Text fontWeight="400" fontSize="15px" lineHeight="15px">
                                        Welcome to{' '}
                                        <chakra.span color="#779341" fontWeight="600" lineHeight="32px" fontSize="21px">
                                            LOREM
                                        </chakra.span>
                                    </Text>
                                </Box>
                                <Box>
                                    <Text fontSize="13px" color="#8D8D8D" lineHeight="19.5px" mb="0">
                                        Have An Account ?
                                    </Text>
                                    <Link href="/login">
                                        <ChakraLink fontSize="14px" lineHeight="19.5px" color="#779341">
                                            Sign in
                                        </ChakraLink>
                                    </Link>
                                </Box>
                            </Flex>
                            <Text lineHeight="30px" fontSize="50px" fontWeight="500" mt="5px" mb="40px">
                                Sign Up
                            </Text>
                            <Box mt="15px">
                                <FormControl>
                                    <InputLabel label="Enter your email address" htmlFor="email" />
                                    <TextField type="text" name="email" placeholder="Email" />
                                </FormControl>
                                <Box d="inline-flex">
                                    <FormControl mr="20px">
                                        <InputLabel label="User name" htmlFor="username" />
                                        <TextField type="text" name="username" width="98%" placeholder="User name" />
                                    </FormControl>
                                    <FormControl>
                                        <InputLabel label="Contact Number" htmlFor="contact" />
                                        <TextField type="text" name="contact" width="98%" pl={['3px', '15px']} placeholder="Contact Number" />
                                    </FormControl>
                                </Box>
                                <FormControl>
                                    <InputLabel label="Enter your password" htmlFor="password" />
                                    <TextField name="password" type="password" placeholder="Password" />
                                </FormControl>
                                <FormControl>
                                    <InputLabel label="Confirm your password" htmlFor="confirmPassword" />
                                    <TextField name="confirmPassword" type="password" placeholder="Confirm Password" />
                                </FormControl>
                            </Box>
                            <Box d="flex" justifyContent="flex-end" mt="30px !important" mb="40px !important">
                                <Button
                                    borderRadius={8}
                                    type="submit"
                                    variant="solid"
                                    color="#fff"
                                    width="236px"
                                    bg="#779341"
                                    _hover={{ bg: '#779341', color: '#fff' }}
                                >
                                    Sign up
                                </Button>
                            </Box>
                        </Stack>
                    </Form>
                </Formik>
            </Box>
        </Box>
        </Box>
    );
};

export default Register;
