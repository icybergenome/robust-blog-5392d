

import { useForm, usePlugin,useCMS } from 'tinacms'
import { useRouter } from "next/router";
import { useEffect } from "react";
import wordListFieldsForCMS from "./tina/wordListFieldsForCMS";
// import { getGraphQLClient } from "../utils/apollo";
import { CREATE_POST } from './graphql/mutation/post';
import { useMutation } from '@apollo/client';
import moment from "moment";



const withPageCMS =
(Component, { fields = [], propName = "newPost" }) =>
  (props) => {
    // const name = Component.
    
    const [createPost, { loading, error,data }] = useMutation(CREATE_POST);
    const router = useRouter();
    const cms = useCMS();
    const _page = props?.[propName] ?? {};
    // console.log("propssss",props)
    const category = props.categories.categories.map((item) => {
      return {
        value: item.category_key,
        label: item.category_name,
      }
    })
    
    const [page, form] = useForm({
      initialValues: _page,
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
            category: dataa.postData.category,
            slug: dataa.postData.slug,
            postDetail: [{__typename: "ComponentBasicDescription", description: ComponentBasicDescription[0]}]
          } 
        },
      };
      console.log("graphaql", CREATE_POST)
      
      
      
      createPost({variables});
      console.log("loading",loading)
      console.log("data",data)
      console.log("error",error)
      // console.log('asda')
      // await getGraphQLClient().request(mutation, variables);
      cms.alerts.success('Post Added Successfully');

      // try{
      //     await getGraphQLClient().request(userPostData, variables);
      //     cms.alerts.success('Post Added Successfully');
      //     router.push('/')
      // }catch(e){
      //   console.log(e);
      // }
      
      
        }

    });

    usePlugin(form);
   
    props = {...page}
    return (
      <Component
        {...{
          createPost,
          error,
          loading,
          data,
          ...props,
          [propName]: _page,
        }}
      />
    );
  };
export default withPageCMS;
