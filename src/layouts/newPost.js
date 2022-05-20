

import React, { useEffect, useContext, useState } from 'react';
import _ from 'lodash';
import moment from 'moment-strftime';
import withPageCMS from "../utils/withPageCMS";
import { Layout } from '../components/index';
import Header from '../components/Header';
import { getPosts } from '../utils/data/getPosts';
import { getHeader } from '../utils/data/getConfigurations';
import Footer from '../components/Footer';
import { htmlToReact, markdownify, withPrefix } from '../utils';
import { getStrapiMedia } from '../utils/strapiMedia';
import { Cache, useMutation,useQuery } from '@apollo/client';

import { useForm, usePlugin, useCMS, withTina, TinaProvider, TinaCMS } from 'tinacms'
import { HtmlFieldPlugin, MarkdownFieldPlugin } from "react-tinacms-editor"
import { CREATE_POST } from '../utils/graphql/mutation/post';
import { GET_POSTS } from '../utils/graphql/queries/getPosts';
import ReactGA from "react-ga4";


import TinaMediaStore from '../utils/tina/store';

import { useRouter } from 'next/router';
import { AuthContext } from '../utils/context/auth-context';

const NewPost = (props) => {
    const cms = useCMS();
    // const [userData, setUserData] = useState({})
    const router = useRouter();

    const ctx = useContext(AuthContext)

    const eventTrack = (category, action, label) => {
        ReactGA.event({
          category: category,
          action: action,
          label: label,
        })
      }
      const categories = _.get(props, 'categories');
      const category = categories.categories.map((cat) => {
        return {value: cat.category_key, label: cat.category_name}
      })
      // console.log("My Cat",category)

    const [createPost, { loading,data,error }] = useMutation(CREATE_POST,
        {
            update: (cache, { data: { createPost } }) => {
                const cachedData  = cache.readQuery({ query: GET_POSTS});
                
                const postedData = createPost
                
                console.log("INSIDE UDPATE FTTTNN posted data",postedData )
                if(cachedData){
                    console.log("inside cached logic",cachedData)
                    const objPost = {
                        id:postedData.post.id,
                        title: postedData.post.title,
                        subtitle:postedData.post.subtitle,
                        date: postedData.post.date,
                        postDetail:postedData.post.postDetail,
                        published_at:postedData.post.published_at,
                        post_img_url:postedData.post.post_img_url,
                        post_created_by: ctx.userInfo.id ? ctx.userInfo.id : '',
                        post_updated_by: ctx.userInfo.id ? ctx.userInfo.id : '',
                        slug:postedData.post.slug,
                    }
                    
                    const isFound = cachedData.posts.filter((item) => item.id === objPost.id)
                    console.log("found",isFound.length)
                    if(!isFound.length){
                        console.log("not Found")
                        const posts = {posts:objPost}
                        console.log("after updasssted",posts)
                        cache.writeQuery({ query: GET_POSTS,data:posts });
                    }
                    
                }else{
                    const objPost = {
                        id:postedData.post.id,
                        title: postedData.post.title,
                        subtitle:postedData.post.subtitle,
                        date: postedData.post.date,
                        postDetail:postedData.post.postDetail,
                        published_at:postedData.post.published_at,
                        post_img_url:postedData.post.post_img_url,
                        post_created_by: ctx.userInfo.id ? ctx.userInfo.id : '',
                        post_updated_by: ctx.userInfo.id ? ctx.userInfo.id : '',
                        slug:postedData.post.slug,
                    }
                    const posts = {posts:objPost}
                    cache.writeQuery({ query: GET_POSTS,data:posts});
                }
                
    }
        });
    
        useEffect(()=>{
            if(loading){
                eventTrack("post","post_publish_requested","Publishing Post")
            }
        },[loading])  
    
        useEffect(()=>{
            
            if(data){
              console.log("DATA",data)
                cms.alerts.success('Post Added Successfully');
    
                eventTrack("post","post_publish","Post Published")
    
                router.push('/');
            }else if(error){
                cms.alerts.error('Error while adding post');
                
            }
        },[data,error])

    const [pagee, form] = useForm(
        {
          initialValues: "newPost",
          label: "Add New Post",
          fields: [
              {
                label: 'Cover Image',
                name: 'postData.post_img_url',
                component: 'image',
                uploadDir: () => "/public",
                parse: ({ previewSrc }) => previewSrc,
                previewSrc: (src) => src,
                
              },
              {
                name: "postData.title",
                label: "Post Title",
                component: "text",
              },
              {
                name: "postData.subtitle",
                label: "Post Subtitle",
                component: "text",
              },
              {
                name: "postData.category",
                label: "Category",
                component: "select",
                defaultValue: "",
                options: [
                  { value: "notSpecified", label: "N/A" },
                  ...category
                ],
              },
              {
                name: "postData.slug",
                label: "Post Slug",
                component: "text",
              },
              {
                name: "postData.description",
                label: "Post Description",
                component: "markdown",
              },
            //   {
                
            //     name: 'postData.blocks',
            //     component: 'blocks',
            //     description: 'Content of blocks',
            //     label: 'Add New Blocks',
            //     templates: {
            //         'body-content-block': {
            //             label: 'Body Content',
            //             key: 'bodyContent',
            //             defaultItem: {
            //                 content: ''
            //             },
            //             fields: [{ name: 'content', label: 'Body Content', component: 'markdown' }]
            //         },
            //         'image-block': {
            //             label: 'Image',
            //             key: 'image-content-block',
            //             fields: [
            //                 {
            //                     label: 'Image',
            //                     name: 'image',
            //                     component: 'image',
            //                     uploadDir: () => '/public',
            //                     parse: ({ previewSrc }) => previewSrc,
            //                     previewSrc: (src) => src
            //                 },
            //                 { name: 'imageCaption', label: 'Image Caption', component: 'text' }
            //             ]
            //         },
            //     }
            // },
        ],
        onSubmit: async (values) => {
            const dataa = {
                ...values
              }
              const date = new Date();
              dataa.date = date.toISOString().split('T')[0];
               const ComponentBasicDescription = dataa.postData.description
      
            //   const ComponentBasicImage = dataa.postData.blocks.map((item) => {
            //     if(item._template === 'body-image-block'){
            //       return item;
            //     }
            //   })

            const variables = {
            input: {
                data:{
                  date:dataa.date,
                  title:dataa.postData.title,
                  subtitle:dataa.postData.subtitle,
                  category: dataa.postData.category,
                  post_img_url:dataa.postData.post_img_url,
                  post_created_by: ctx.userInfo.id ? ctx.userInfo.id : '',
                  post_updated_by: ctx.userInfo.id ? ctx.userInfo.id : '',
                  slug: dataa.postData.slug,
                  postDetail: [{__typename: "ComponentBasicDescription", description: ComponentBasicDescription}]
                }
              },
            };

            console.log("My Variables",variables)
            
            createPost({variables})
          
        }
      }
    )
      usePlugin(form)
        const post = pagee
        const date = new Date();
        const dateTimeAttr = moment(date).strftime('%Y-%m-%d %H:%M');
        const formattedDate = moment(date).strftime('%B %d, %Y');
        const dataa = _.get(props, 'data');
        const config = _.get(dataa, 'config');
        const page = _.get(props, 'page');
        return (
            <Layout page={page} config={config}>
                <Header config={config} page='newPost' image={post.postData && post.postData.post_img_url} />
                <div id="content" className="site-content">
                    <main id="main" className="site-main inner">
                        <article className="post post-full">
                            <header className="post-header">
                               {post.postData && <h1 className="post-title">{post.postData.title}</h1>} 
                                {/* <div style={{ backgroundColor: category ? category.category_color : '' }} className="cagtegory_tag">
                                    {category && category.category_name}
                                </div> */}
                                {post.postData &&
                                    <div className="post-meta">
                                        Published on <time className="published" dateTime={dateTimeAttr}>{formattedDate}</time>
                                    </div>}
                            </header>
                            {post.postData && <div className="post-subtitle">{post.postData.subtitle}</div>}
                            <img className="thumbnail" src='' alt='' />
                            {post.postData &&  post.postData.description && (
                                    <div style={{ marginTop: '2rem' }} className="post-content">
                                        {markdownify(post.postData.description)}
                                    </div>
                                )}
                        </article>
                    </main>
                    <Footer config={config} />
                </div>
            </Layout>
        );
    
}



export default NewPost;

