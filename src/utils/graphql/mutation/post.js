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

