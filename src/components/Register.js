
import axios from 'axios';
import React , {useEffect, useState, useContext} from 'react';
import { REGISTER } from '../utils/graphql/mutation/post';
import { useMutation } from '@apollo/client';

import {
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
    FormHelperText,
    Link,
    useColorModeValue
} from '@chakra-ui/react';

import { AuthContext } from '../utils/context/auth-context';

const Register = () => {
    const [register,{loading,data,error}] = useMutation(REGISTER)
    const [userName, setUserName] = useState('')
    const [emailAddress, setEmailAddress] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const { isOpen, onOpen, onClose } = useDisclosure();
    const authCtx = useContext(AuthContext)

    useEffect(() => {
      if(data){
        authCtx.setUserDetails(data.login.user)
        authCtx.setAuthState(data.login.jwt)
        // const token = localStorage.getItem("jwtToken")
        // const userInfo = localStorage.getItem("userInfo")
        
        // console.log("jwt Token",token);
        // console.log("user Info",JSON.parse(userInfo));
      }
    }, [data])

    const handleUserName = (event) => {
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
        console.log('Fields not empty');
      }else{
        console.log("fields should not be empty")
      }

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
    }


    return (
      <>
            <Button onClick={onOpen}>Open Register Modal</Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Register</ModalHeader>
                    <ModalBody>
                        <form onSubmit={handleSubmitForm}>
                            <FormControl>
                                <FormLabel htmlFor="username" color={useColorModeValue('#000', '#fff')}>
                                    User Name
                                </FormLabel>
                                <Input id="username" type="text" value={userName} onChange={handleUserName}/>
                            </FormControl>
                            <FormControl>
                                <FormLabel htmlFor="email" color={useColorModeValue('#000', '#fff')}>
                                    Email address
                                </FormLabel>
                                <Input id="email" type="email" value={emailAddress} onChange={handleEmail} />
                            </FormControl>
                            <FormControl>
                                <FormLabel htmlFor="password" color={useColorModeValue('#000', '#fff')}>
                                    Password
                                </FormLabel>
                                <Input id="password" type="password" value={password} onChange={handlePassword} />
                            </FormControl>
                            <FormControl>
                                <FormLabel htmlFor="confirm-password" color={useColorModeValue('#000', '#fff')}>
                                    Confirm Password
                                </FormLabel>
                                <Input id="confirm-password" type="password" value={confirmPassword} onChange={handleConfirmPassword} />
                            </FormControl>
                            <Button mt={2} type='submit'>Submit</Button>
                        </form>
                    </ModalBody>

                    <Link href="/login" textDecoration="none">
                        Already have an account ? Login
                    </Link>
                </ModalContent>
            </Modal>
            </>
        
    );
};

export default Register;
