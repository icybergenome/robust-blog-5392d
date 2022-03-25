import axios from 'axios';
import React, {useEffect, useState, useContext} from 'react';
import { LOGIN } from '../utils/graphql/mutation/post';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import {
    useColorModeValue,
    Button,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Modal,
    useDisclosure,
    FormControl,
    FormLabel,
    Input,
    Link
} from '@chakra-ui/react';

import Toast from './Toast'

import { AuthContext } from '../utils/context/auth-context';

 const Login = () => {
    const [login, {data,loading,error}] = useMutation(LOGIN)
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const authCtx = useContext(AuthContext)

    const isAuth = authCtx.isUserAuthenticated();
    
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
            console.log('Fields not empty');
        } else {
            console.log('Fields should not be empty');
        }
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
    }
    return (
        <>
            <Button onClick={onOpen}>Open Login Modal</Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Login</ModalHeader>
                    <ModalBody>
                        <form onSubmit={handleSubmitForm}>
                            <FormControl>
                                <FormLabel htmlFor="username" color={useColorModeValue('#000', '#fff')} >
                                    Username
                                </FormLabel>
                                <Input id="username" type="text" value={userName} onChange={handleUsername}/>
                            </FormControl>
                            <FormControl>
                                <FormLabel htmlFor="password" color={useColorModeValue('#000', '#fff')} >
                                    Password
                                </FormLabel>
                                <Input id="password" type="password" value={password} onChange={handlePassword}/>
                            </FormControl>
                            <Button type='submit' mt={2}>
                                Submit
                            </Button>
                        </form>
                    </ModalBody>
                    <Link href="/register" textDecoration="none">
                        Dont have account ? Signup
                    </Link>
                </ModalContent>
            </Modal>
            {/* { (!isAuth && authCtx.authError.length > 0) && <Toast title={authCtx.authError.title} message={authCtx.authError.message} /> } */}
        </>
    );
};





export default Login;
