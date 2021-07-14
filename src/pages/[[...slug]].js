import React from 'react';
import _ from 'lodash';
import { sourcebitDataClient } from 'sourcebit-target-next';
import { withRemoteDataUpdates } from 'sourcebit-target-next/with-remote-data-updates';
import { getPage } from '../utils/data/getPage';
import { data } from '../../content/idMaping/types';
import { getHeader, getCategories } from '../utils/data/getConfigurations';
import { getPosts } from '../utils/data/getPosts';
import pageLayouts from '../layouts';

class Page extends React.Component {
    render() {
        const modelName = _.get(this.props.page, 'page.model_name');
        // const modelName = _.get(this.props, 'page.__metadata.modelName');

        const PageLayout = pageLayouts[modelName];
        if (!PageLayout) {
            throw new Error(`no page layout matching the page model: ${modelName}`);
        }
        return <PageLayout {...this.props} />;
    }
}

export async function getStaticPaths() {
    const paths = await sourcebitDataClient.getStaticPaths();
    return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
    // const pagePath = '/' + (params.slug ? params.slug.join('/') : '');
    // const props = await sourcebitDataClient.getStaticPropsForPageAtPath(pagePath);
    const slug = data.find((d) => d.name === (params.slug ? params.slug[0] : '/'));
    const props = {
        page: await getPage({ id: slug.id, fields: slug.fields }),
        header: await getHeader(),
        posts: await getPosts(),
        categories: await getCategories()
    };
    return { props };
}

export default withRemoteDataUpdates(Page);
