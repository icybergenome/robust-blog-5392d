import React from 'react';
import _ from 'lodash';

import { Layout } from '../components/index';
import Header from '../components/Header';
import FormField from '../components/FormField';
import Footer from '../components/Footer';
import { htmlToReact, markdownify } from '../utils';
import {getStrapiMedia}  from '../utils/strapiMedia'
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Textarea , Box, Button,FormControl,Select } from '@chakra-ui/react';
import Link from 'next/link'
import { Link as ChakraLink } from "@chakra-ui/react";
import InputLabel from '../components/InputLabel';
import TextField from '../components/TextField';
import { ErrorMessage } from 'formik' 
export default class Contact extends React.Component {
    render() {
        console.log("My props",this.props)
        const data = _.get(this.props, 'data');
        const config = _.get(data, 'config');
        const header = _.get(this.props, 'header.header');
        const page = _.get(this.props, 'page.page');
        const title = _.get(page, 'title');
        const subtitle = _.get(page, 'subtitle');
        const headerImage = getStrapiMedia(_.get(header, 'background_img'))
        // const markdownContent = _.get(page, 'content[0].markdown_content');
        // const formId = _.get(page, 'content[0].form_id');
        // const formAction = _.get(page, 'content[0].form_action');
        // const formFields = _.get(page, 'content[0].form_fields');
        // const submitLabel = _.get(page, 'content[0].submit_label');
        // const formHoneypotInputId = formId + '-honeypot';
        // const formHoneypotLabelId = formId + '-honeypot-label';
        // const formHoneypotName = formId + '-bot-field';
        const validate = Yup.object({
            name: Yup.string().required('Required'),
            email: Yup.string().required('Required'),
            subject: Yup.string().required('Required'),
            message: Yup.string().required('Please write your message'),
          });
        return (
            <Layout page={page} config={config}>
                <Header config={config} page={this.props} image={headerImage} />
                <div id="content" className="site-content">
                    <main id="main" className="site-main inner">
                        <article className="post page post-full">
                            <header className="post-header">
                                <h1 className="post-title">{title}</h1>
                            </header>
                            {subtitle && <div className="post-subtitle">{htmlToReact(subtitle)}</div>}
                            <div className="post-content">
                                <Formik
                                    initialValues={{
                                    name: '',
                                    email: '',
                                    subject: '',
                                    message: '',
                                    }}
                                    validationSchema={validate}
                                    onSubmit={(values) => {
                                    const variables = {
                                        input: {
                                            name: values.name,
                                            email: values.email
                                        }
                                    };
                                    // login({ variables });

                                }}
                                >
                                    <Form>
                                            <Box 
                                                mt="25px" 
                                                width={["390px","600px"]}
                                                backgroundColor={["rgba(255,255,255,0.6)","#fff"]}
                                            >
                                                <FormControl mt="35">
                                                    <InputLabel label="Enter your username or email address" htmlFor="name" color="grey"/>
                                                    <TextField type='text' placeholder='Type your name here' name="name" bg="#D3D3D3"/>
                                                </FormControl>
                                                <FormControl mt="35px">
                                                    <InputLabel label="Enter your email" htmlFor="email" color="grey"/>
                                                    <TextField type="email" placeholder="Type your email here" name="email" bg="#D3D3D3"/>
                                                </FormControl>
                                                <FormControl mt="35px">
                                                    <InputLabel label="Select Your Subject" htmlFor="subject" color="grey"/>
                                                    <Select placeholder='Select option' bg="#D3D3D3" name="subject">
                                                        <option value='error'>Error on site</option>
                                                        <option value='sponsorship'>Sponsorship</option>
                                                        <option value='other'>Other</option>
                                                    </Select>
                                                </FormControl>
                                                <FormControl mt="35px">
                                                    <InputLabel label="Enter you message" htmlFor="message" color="grey"/>
                                                    <Textarea
                                                        placeholder='Type your message here'
                                                        size='md'
                                                        name="message"
                                                        bg="#D3D3D3"
                                                    />
                                                     <ErrorMessage component="div" name="message" className="error"/>
                                                </FormControl>
                                            </Box>
                                            <Box d="flex" justifyContent="flex-start" mt="30px !important" mb="40px !important">
                                                <Button
                                                borderRadius={8}
                                                type="submit"
                                                variant="solid"
                                                color="#fff"
                                                width="236px"
                                                bg="#779341"
                                                _hover={{bg:"#779341",color:"#fff"}}
                                                >
                                                    Send Message
                                                </Button>
                                            </Box>
                                    </Form>
                                </Formik>
                            </div>
                        </article>
                    </main>
                    <Footer config={config} />
                </div>
            </Layout>
        );
    }
}
