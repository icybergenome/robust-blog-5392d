import React, { useEffect, useContext } from 'react';
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
import { useForm, usePlugin,useCMS } from 'tinacms'
import { CREATE_POST } from '../utils/graphql/mutation/post';
import { GET_POSTS } from '../utils/graphql/queries/getPosts';
import { useRouter } from 'next/router';
import { AuthContext } from '../utils/context/auth-context';

// import { getCategories } from '../utils/graphql/queries/get';

const NewPost = (props) => {


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
                        slug:postedData.post.slug,
                    }
                    const posts = {posts:objPost}
                    console.log("dataaaa",posts)
                    cache.writeQuery({ query: GET_POSTS,data:posts});
                    console.log("successfull")
                }
                
    }
        });
    // console.log("data out",data)
    // const categories = getCategories()
    const cms = useCMS();
    // let category = [{value:'',label:''}]
    // if(categories){
    //     category = categories.categories.map((item) => {
    //             return {
    //             value: item.category_key,
    //             label: item.category_name,
    //             }
    //         })
    // }

    // console.log("myy categoriess",category)

    // useEffect(()=> {
    //     console.log("data in",data)
    // },[])


    const [pagee, form] = useForm(
        {
          initialValues: "newPost",
          label: "Add New Post",
          fields: [
            {
                label: 'Hero Image',
                name: 'frontmatter.hero_image',
                component: 'image',
                // Generate the frontmatter value based on the filename
                parse: media => `/static/${media.filename}`,
      
                // Decide the file upload directory for the post
                uploadDir: () => '/public/static/',
      
                // Generate the src attribute for the preview image.
                previewSrc: fullSrc => fullSrc.replace('/public', ''),
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
            //   {
            //     name: "postData.category",
            //     label: "Category",
            //     component: "select",
            //     defaultValue: "",
            //     options: [
            //       { value: "notSpecified", label: "N/A" },
            //       ...category
            //     ],
            //   },
              {
                name: "postData.slug",
                label: "Post Slug",
                component: "text",
              },
              {
                
                name: 'postData.blocks',
                component: 'blocks',
                description: 'Content of blocks',
                label: 'Add New Blocks',
                templates: {
                    'body-content-block': {
                        label: 'Body Content',
                        key: 'bodyContent',
                        defaultItem: {
                            content: ''
                        },
                        fields: [{ name: 'content', label: 'Body Content', component: 'markdown' }]
                    },
                    'image-block': {
                        label: 'Image',
                        key: 'image-content-block',
                        fields: [
                            {
                                label: 'Image',
                                name: 'image',
                                component: 'image',
                                uploadDir: () => '/public',
                                parse: ({ previewSrc }) => previewSrc,
                                previewSrc: (src) => src
                            },
                            { name: 'imageCaption', label: 'Image Caption', component: 'text' }
                        ]
                    },
                }
            },
        ],
        onSubmit: async (values) => {
            const dataa = {
                ...values
              }
              const date = new Date();
              dataa.date = date.toISOString().split('T')[0];
               const ComponentBasicDescription = dataa.postData.blocks.map((item) => {
                if(item._template === 'body-content-block'){
                  return item.content;
                }
              })
      
              const ComponentBasicImage = dataa.postData.blocks.map((item) => {
                if(item._template === 'body-image-block'){
                  return item;
                }
              })
            const variables = {
            input: {
                data:{
                  date:dataa.date,
                  title:dataa.postData.title,
                  subtitle:dataa.postData.subtitle,
                //   category: dataa.postData.category,
                  slug: dataa.postData.slug,
                  postDetail: [{__typename: "ComponentBasicDescription", description: ComponentBasicDescription[0]}]
                } 
              },
            };
            
            createPost({ variables})
            if(error){
                cms.alerts.error('Error while adding post');
            }else{
                cms.alerts.success('Post Added Successfully');
                // router.push('/');
            }
            
          
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
                <Header config={config} page='newPost' image={props.headerImg} />
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
                            {post.postData &&  post.postData.blocks &&
                                post.postData.blocks.map((item,index) => {
                                    switch (item._template) {
                                        case 'body-content-block':
                                            return (
                                                <div key={index} style={{ marginTop: '2rem' }} className="post-content">
                                                    {markdownify(item.content)}
                                                </div>
                                            );
                                        case 'image-block':
                                            return (
                                                
                                                <img
                                                    key={index}
                                                    style={{ marginTop: '2rem' }}
                                                    className="thumbnail"
                                                    src={withPrefix(getStrapiMedia(item.image))}
                                            />
                                            );

                                        // case 'ComponentBasicVideo':
                                        //     return (
                                        //         <video style={{ width: '100%', height: '400px' }} controls>
                                        //             <source src={getStrapiMedia(video)}></source>
                                        //         </video>
                                        //     );
                                        // case 'ComponentBasicVideoWithUrl':
                                        //     return <iframe style={{ width: '100%', height: '400px' }} src={url}></iframe>;
                                        default:
                                    }
                                })}
                        </article>
                    </main>
                    <Footer config={config} />
                </div>
            </Layout>
        );
    
}

export async function getServerSideProps({ params }) {
    console.log("Server side props",params)
    const props = {
        header: await getHeader(),
        posts: await getPosts(),
        slug: "newPost",
        protected: true,
    };
    console.log("New Post props",props)
    return { props };
}


export default NewPost

