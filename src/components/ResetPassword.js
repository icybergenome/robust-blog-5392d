import React, { useEffect, useState, useContext } from 'react';
import { LOGIN } from '../utils/graphql/mutation/post';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { AuthContext } from '../utils/context/auth-context';
import Link from 'next/link';
import { Link as ChakraLink } from '@chakra-ui/react';
import { RESET_PASSWORD } from '../utils/graphql/mutation/post';
import InputLabel from './InputLabel';
import TextField from './TextField';

import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { Flex, Input, Button, Stack, Box, FormLabel, chakra, FormControl, Text } from '@chakra-ui/react';

const ResetPassword = () => {
    const [resetPass, { data, loading, error }] = useMutation(RESET_PASSWORD);


    const router = useRouter();

    const authCtx = useContext(AuthContext);



    useEffect(() => {
        if(loading){
          eventTrack("authentication","reset_password_requested","Reset Password Requested")
        }
    },[loading])

    useEffect(() => {
        if (data) {
            authCtx.setUserDetails(data.resetPassword.user);
            authCtx.setAuthState(data.resetPassword.jwt);

            eventTrack("authentication","forgot_password_success","Forgot Password Success")
            router.push('/');
        }
    }, [data]);

    const validate = Yup.object({
      code: Yup.string().min(20, 'Must be atleast 20 characters').required('Required'),
      password: Yup.string().min(6, 'Password must be atleast 6 characters').required('Required'),
      confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm Password is required')
  });


    return (
        <Box bgImage="url('/images/login_banner.jpg')" bgPosition={['', 'center']} bgRepeat="no-repeat" bgSize="cover">
            <Box d="flex" justifyContent={['center', 'end']} alignItems="center" minW={{ base: '90%', md: '539px' }} mr={['0', '118px']}>
                <Formik
                  initialValues={{
                    code: '',
                    password: '',
                    confirmPassword: ''
                  }}
                  validationSchema={validate}
                  onSubmit={(values) => {
                  const variables = {
                      code: values.code,
                      password: values.password,
                      passwordConfirmation: values.confirmPassword
                  };
                  resetPass({ variables });
      
                }}
                >
                    <Form>
                        <Stack
                            mt="80px"
                            mb="80px"
                            width={['390px', '510px']}
                            height="660px"
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
                                    <Text fontWeight="400" fontSize="21px" lineHeight="32px">
                                        Welcome to{' '}
                                        <chakra.span color="#779341" fontWeight="600" lineHeight="32px" fontSize="21px">
                                            LOREM
                                        </chakra.span>
                                    </Text>
                                </Box>
                            </Flex>
                            <Text lineHeight="82px" fontSize="55px" fontWeight="500" mt="0" mb="40px">
                                Reset Password
                            </Text>
                            <FormControl>
                                <InputLabel label="Enter your code" htmlFor="code" />
                                <TextField type="text" placeholder="Code" name="code" />
                            </FormControl>
                            <FormControl>
                                <InputLabel label="Enter your password" htmlFor="password" />
                                <TextField type="password" placeholder="Password" name="password" />
                            </FormControl>
                            <FormControl>
                                <InputLabel label="Enter your confirm password" htmlFor="confirmPassword" />
                                <TextField type="password" placeholder="Confirm Password" name="confirmPassword" />
                            </FormControl>
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

export default ResetPassword;
