import React from 'react';
import _ from 'lodash';
import { sourcebitDataClient } from 'sourcebit-target-next';
import { withRemoteDataUpdates } from 'sourcebit-target-next/with-remote-data-updates';
import { getPage } from '../utils/data/getPage';
import { data } from '../../content/idMaping/types';
import { getHeader, getCategories } from '../utils/data/getConfigurations';
import { GET_POSTS } from '../utils/graphql/queries/getPosts';
import { useQuery } from '@apollo/client';
import pageLayouts from '../layouts';

const Page = (props) => {
    

    const {data,error,loading} = useQuery(GET_POSTS);
    const modelName = _.get(props.page, 'page.model_name');

    const PageLayout = pageLayouts[modelName];
    if (!PageLayout) {
        throw new Error(`no page layout matching the page model: ${modelName}`);
    }
    
    return <PageLayout {...props} posts={data}/>;
    
}

export async function getStaticPaths() {
    const paths = await sourcebitDataClient.getStaticPaths();
    return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
    const slug = data.find((d) => d.name === (params.slug ? params.slug[0] : '/'));
    const props = {
        slug: slug.name,
        page: await getPage({ id: slug.id, fields: slug.fields }),
        header: await getHeader(),
        categories: await getCategories(),
        protected: true
    };
    return { props };
}

export default Page;
