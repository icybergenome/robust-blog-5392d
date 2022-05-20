import React, { useEffect, useState, useContext } from 'react';
import _ from 'lodash';
import { sourcebitDataClient } from 'sourcebit-target-next';
import { withRemoteDataUpdates } from 'sourcebit-target-next/with-remote-data-updates';
import { data } from '../../content/idMaping/types';
import { GET_POSTS } from '../utils/graphql/queries/getPosts';
import { GET_CATEGORIES } from '../utils/graphql/queries/getCategories';
import { GET_PAGE } from '../utils/graphql/queries/getPage';
import { GET_HEADER } from '../utils/graphql/queries/getHeader';
import { CMSContext, useCMS } from 'tinacms';
import pageLayouts from '../layouts';
import { client } from '../utils/apollo/apollo';

const Page = (props) => {



  const modelName = _.get(props.page, 'page.model_name');
  const PageLayout = pageLayouts[modelName];
  if (!PageLayout) {
      throw new Error(`no page layout matching the page model: ${modelName}`);
  }


  
  return <PageLayout {...props} />;
    
}

export async function getStaticPaths() {
    const paths = await sourcebitDataClient.getStaticPaths();
    return { paths, fallback: false };
    
}

export async function getStaticProps({params}) {
    const slug = data.find((d) => d.name === (params.slug ? params.slug[0] : '/'))
    const categories = await client.query({
        query: GET_CATEGORIES,
      });
    const page = await client.query({
        query: GET_PAGE,
        variables:{
            id: slug.id,
            fields: slug.fields
        }
      });
    const header = await client.query({
        query: GET_HEADER,
      });
    const posts = await client.query({
        query: GET_POSTS,
      });
    
    
    const props = {
        slug: slug.name,
        page: page.data,
        header: header.data,
        categories: categories.data,
        posts: posts.data,
        protected: true
    };
    return { props };
}

export default Page;