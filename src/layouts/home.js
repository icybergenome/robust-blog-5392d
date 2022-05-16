import React from 'react';
import _ from 'lodash';
import moment from 'moment-strftime';
import { getStrapiMedia } from '../utils/strapiMedia';
import { Layout } from '../components/index';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getPageUrl, Link, withPrefix } from '../utils';
import { useCMS } from 'tinacms';
// import { post } from '.';
const Home = (props) => {
    // const cms = useCMS()
    // cms.disable()
    // cms.sidebar.isOpen = false

    const renderPost = (post, index, hasMoreLink, moreLinkText) => {
        const title = _.get(post, 'title');
        const thumbImage = getStrapiMedia(_.get(post, 'cover_img'));
        const thumbImageAlt = _.get(post, 'cover_img.alternativeText', '');
        const post_img_url = _.get(post, 'post_img_url');
        const excerpt = _.get(post, 'subtitle');
        const date = _.get(post, 'date');
        const dateTimeAttr = moment(date).strftime('%Y-%m-%d %H:%M');
        const formattedDate = moment(date).strftime('%B %d, %Y');
        const postUrl = getPageUrl(post, { withPrefix: true });
         
        return (
            <article key={index} className="post">
                <header className="post-header">
                    <h2 className="post-title">
                        <Link href={postUrl}>{title}</Link>
                    </h2>
                    <div className="post-meta">
                        Published on{' '}
                        <time className="published" dateTime={dateTimeAttr}>
                            {formattedDate}
                        </time>
                    </div>
                </header>
                
                <Link className="post-thumbnail" href={postUrl}>
                    <img className="thumbnail" src={post_img_url ? post_img_url : '/images/no-image.jpg'} />
                </Link>
                
                {excerpt && (
                    <div className="post-content">
                        <p>{excerpt}</p>
                    </div>
                )}
                
                <p className="read-more">
                    <Link className="read-more-link" href={postUrl}>
                        Keep Reading {moreLinkText} <span className="icon-arrow-right" aria-hidden="true" />
                    </Link>
                </p>
                
            </article>
        );
    }

        const data = _.get(props, 'data');
        const config = _.get(data, 'config');
        const header = _.get(props, 'header.header');
        const headerImage = getStrapiMedia(_.get(header, 'background_img'));
        const page = _.get(props, 'page.page');
        const hasMoreLink = _.get(page, 'page.has_more_link');
        const categories = _.get(props, 'categories.categories');

        const moreLinkText = _.get(page, 'page.more_link_text');
        const posts = _.orderBy(_.get(props, 'posts', []), 'published_at', 'desc');
        return (
            <Layout page={page} config={config}>
                <Header config={config} page={props} image={headerImage} />
                <div id="content" className="site-content">
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <main id="main" className="site-main inner">
                            <div className="post-feed">{_.map(posts[0], (post, index) => renderPost(post, index, hasMoreLink, moreLinkText))}</div>
                        </main>
                        <div className="categories_box">
                            <h4>Categories</h4>
                            <div className="categories_container">
                                {categories &&
                                    _.map(categories, ({ category_name, category_color, category_key }, index) => {
                                        // console.log(category_name);
                                        return (
                                            <div style={{ backgroundColor: category_color }} className="cagtegory_tag" key={index}>
                                                {category_name}
                                            </div>
                                        );
                                    })}
                            </div>
                        </div>
                    </div>

                    <Footer config={config} />
                </div>
            </Layout>
        );
    
}


export default Home;
