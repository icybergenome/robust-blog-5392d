import React from 'react';
import _ from 'lodash';
import moment from 'moment-strftime';
import { getStrapiMedia } from '../utils/strapiMedia';
import { Layout } from '../components/index';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getPageUrl, Link, withPrefix } from '../utils';
export default class Home extends React.Component {
    renderPost(post, index, hasMoreLink, moreLinkText) {
        const title = _.get(post, 'title');
        const thumbImage = getStrapiMedia(_.get(post, 'cover_img'));
        const thumbImageAlt = _.get(post, 'cover_img.alternativeText', '');
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
                {thumbImage && (
                    <Link className="post-thumbnail" href={postUrl}>
                        <img className="thumbnail" src={withPrefix(thumbImage)} alt={thumbImageAlt} />
                    </Link>
                )}
                {excerpt && (
                    <div className="post-content">
                        <p>{excerpt}</p>
                    </div>
                )}
                {hasMoreLink && moreLinkText && (
                    <p className="read-more">
                        <Link className="read-more-link" href={postUrl}>
                            {moreLinkText} <span className="icon-arrow-right" aria-hidden="true" />
                        </Link>
                    </p>
                )}
            </article>
        );
    }

    render() {
        const data = _.get(this.props, 'data');
        const config = _.get(data, 'config');
        const header = _.get(this.props, 'header.header');
        const headerImage = getStrapiMedia(_.get(header, 'background_img'));
        const page = _.get(this.props, 'page.page');
        const hasMoreLink = _.get(page, 'page.has_more_link');

        const moreLinkText = _.get(page, 'page.more_link_text');
        const posts = _.orderBy(_.get(this.props, 'posts.posts', []), 'published_at', 'desc');
        return (
            <Layout page={page} config={config}>
                <Header config={config} page={this.props} image={headerImage} />
                <div id="content" className="site-content">
                    <main id="main" className="site-main inner">
                        <div className="post-feed">{_.map(posts, (post, index) => this.renderPost(post, index, hasMoreLink, moreLinkText))}</div>
                    </main>
                    <Footer config={config} />
                </div>
            </Layout>
        );
    }
}
