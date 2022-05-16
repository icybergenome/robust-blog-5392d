import React from 'react';
import _ from 'lodash';
import moment from 'moment-strftime';
import { withRouter } from 'next/router';
import { Layout } from '../../components/index';
import Header from '../../components/Header';
import { client } from '../../utils/apollo/apollo';

import { GET_POSTS } from '../../utils/graphql/queries/getPosts';
import { GET_HEADER } from '../../utils/graphql/queries/getHeader';
import { GET_CATEGORIES } from '../../utils/graphql/queries/getCategories';

import Footer from '../../components/Footer';
import { htmlToReact, markdownify, withPrefix } from '../../utils';
import { getStrapiMedia } from '../../utils/strapiMedia';

import Link from 'next/link'

class Post extends React.Component {
    render() {
        const slug = this.props.router.query.slug;
        const posts = _.get(this.props, 'posts.posts');

        const post = _.find(posts, function (d) {
            return d.slug === slug;
        });
        const data = _.get(this.props, 'data');
        const config = _.get(data, 'config');
        const header = _.get(this.props, 'header.header');
        const categories = _.get(this.props, 'categories.categories');
        const title = _.get(post, 'title');
        const subtitle = _.get(post, 'subtitle');
        const cover_img_url = _.get(post, 'post_img_url');
        // const postSlug = _.get(post, 'slug');
        const headerImage = _.get(header, 'background_img') ? getStrapiMedia(_.get(header, 'background_img')) : '';
        const date = _.get(post, 'date');
        // const thumbImage = _.get(post, 'cover_img') ? getStrapiMedia(_.get(post, 'cover_img')) : '';
        // const thumbImageAlt = _.get(post, 'cover_img.alternativeText') ? _.get(post, 'cover_img.alternativeText') : '';
        const dateTimeAttr = moment(date).strftime('%Y-%m-%d %H:%M');
        const formattedDate = moment(date).strftime('%B %d, %Y');
        const postDetail = _.get(post, 'postDetail');
        const category = _.find(categories, function (d) {
            return d.category_key === post.category;
        });
        console.log("MY PROPS",post)
        return (
            <>
                <Header config={config} page={this.props} image={cover_img_url ? cover_img_url : '/images/no-image.jpg'} />
                <div id="content" className="site-content">
                    <main id="main" className="site-main inner">
                        <article className="post post-full">
                        <Link href={`../../../editPost/${post.id}`}>
                            Edit
                        </Link>
                            <header className="post-header">
                                <h1 className="post-title">{title}</h1>
                                <div style={{ backgroundColor: category ? category.category_color : '' }} className="cagtegory_tag">
                                    {category && category.category_name}
                                </div>
                               
                                <div className="post-meta">
                                    Published on{' '}
                                    <time className="published" dateTime={dateTimeAttr}>
                                        {formattedDate}
                                    </time>
                                </div>
                            </header>
                            {subtitle && <div className="post-subtitle">{htmlToReact(subtitle)}</div>}
                            {/* {thumbImage && <img className="thumbnail" src={withPrefix(thumbImage)} alt={thumbImageAlt} />} */}
                            {postDetail &&
                                _.map(postDetail, ({ __typename, image, video, description, url }, index) => {
                                    console.log(getStrapiMedia(video));
                                    switch (__typename) {
                                        case 'ComponentBasicImage':
                                            return (
                                                <img
                                                    key={index}
                                                    style={{ marginTop: '2rem' }}
                                                    className="thumbnail"
                                                    src={withPrefix(getStrapiMedia(image))}
                                                    alt={image.alternativeText}
                                                />
                                            );
                                        case 'ComponentBasicDescription':
                                            return (
                                                <div key={index} style={{ marginTop: '2rem' }} className="post-content">
                                                    {markdownify(description)}
                                                </div>
                                            );

                                        case 'ComponentBasicVideo':
                                            return (
                                                <video style={{ width: '100%', height: '400px' }} controls>
                                                    <source src={getStrapiMedia(video)}></source>
                                                </video>
                                            );
                                        case 'ComponentBasicVideoWithUrl':
                                            return <iframe style={{ width: '100%', height: '400px' }} src={url}></iframe>;
                                        default:
                                    }
                                })}
                        </article>
                    </main>
                    <Footer config={config} />
                </div>
            </>
        );
    }
}

export const getServerSideProps = async (context) => {
    // const props = { posts: await getPosts(), header: await getHeader(), categories: await getCategories() };
    const header = await client.query({
        query: GET_HEADER,
      });
    const posts = await client.query({
        query: GET_POSTS,
      });
    const categories = await client.query({
    query: GET_CATEGORIES,
    });
    return { props: {
        header: header.data,
        posts: posts.data,
        categories: categories.data
    } };
};

export default withRouter(Post);
