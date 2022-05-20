import React from 'react'
import { gql } from "@apollo/client";

export const CREATE_POST = gql`
    mutation createPost($input: createPostInput) {
      createPost(input: $input) {
        post {
            id
            title
            subtitle
            slug
            published_at
            date
            post_img_url
            post_created_by
            post_updated_by
            postDetail {
                __typename
                ... on ComponentBasicImage {
                    image {
                        url
                        alternativeText
                        caption
                    }
                }
                __typename
                ... on ComponentBasicDescription {
                    description
                }
                __typename
                ... on ComponentBasicVideo {
                    video {
                        url
                        caption
                        alternativeText
                    }
                }
                __typename
                ... on ComponentBasicVideoWithUrl {
                    url
                }
            }
        }
    }
  }
  `;

export const UPDATE_POST = gql`
    mutation updatePost($input: updatePostInput) {
      updatePost(input: $input) {
        post {
            id
            title
            subtitle
            slug
            published_at
            post_img_url
            date
            category
            post_updated_by
            postDetail {
                __typename
                ... on ComponentBasicImage {
                    image {
                        url
                        alternativeText
                        caption
                    }
                }
                __typename
                ... on ComponentBasicDescription {
                    description
                }
                __typename
                ... on ComponentBasicVideo {
                    video {
                        url
                        caption
                        alternativeText
                    }
                }
                __typename
                ... on ComponentBasicVideoWithUrl {
                    url
                }
            }
        }
    }
  }
  `;

export const LOGIN = gql`
  mutation login($input: UsersPermissionsLoginInput!){
    login(input: $input){
        jwt,
        user { 
            id
            blocked 
            confirmed 
            username 
            email
            role{
                id
                name
                description
                type
            }
        }
    }
  }
  `;

export const REGISTER = gql`
  mutation register($input: UsersPermissionsRegisterInput!){
    register(input: $input){
      jwt
      user { 
        id
        blocked 
        confirmed 
        username 
        email
        role{
            id
            name
            description
            type
        }
    }
    }
  }
  `;

export const ForgotPassword = gql`
  mutation forgotPassword($email: String!){
    forgotPassword(email: $email){
        ok
    }
}
  `;


export const RESET_PASSWORD = gql`
    mutation ResetPassword(
        $password: String!
        $passwordConfirmation: String!
        $code: String!
    ) {
        resetPassword(
        password: $password
        passwordConfirmation: $passwordConfirmation
        code: $code
        ) {
        jwt
        user {
            id
            username
            email
            confirmed
            blocked
            role {
            name
            }
        }
        }
    }
  `;


  export const UPLOAD_FILE = gql`
    mutation upload($file: Upload!) {
        upload(file: $file) {
            name
        }
    }
  `;

