import React from 'react';
import _ from 'lodash';
import moment from 'moment-strftime';
import { withRouter } from 'next/router';
import { Layout } from '../../components/index';
import Header from '../../components/Header';
import HeaderAlt from '../../components/HeaderAlt';
import { getPosts } from '../../utils/data/getPosts';
import { getHeader } from '../../utils/data/getConfigurations';
import Footer from '../../components/Footer';
import { htmlToReact, markdownify, withPrefix } from '../../utils';
import { getStrapiMedia } from '../../utils/strapiMedia';

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
        console.log(post);
        const page = _.get(this.props, 'page');
        const hideHeader = _.get(post, 'hide_header');
        const title = _.get(post, 'title');
        const subtitle = _.get(post, 'subtitle');
        const headerImage = _.get(header, 'background_img') ? getStrapiMedia(_.get(header, 'background_img')) : '';
        const date = _.get(post, 'date');
        const thumbImage = _.get(post, 'thumb_img_path') ? getStrapiMedia(_.get(post, 'thumb_img_path')) : '';
        const thumbImageAlt = _.get(post, 'thumb_img_path.alternativeText') ? _.get(post, 'thumb_img_path.alternativeText') : '';
        const dateTimeAttr = moment(date).strftime('%Y-%m-%d %H:%M');
        const formattedDate = moment(date).strftime('%B %d, %Y');
        const postDetail = _.get(post, 'post_detail');
        const markdownContent = _.get(post, 'markdown_content');
        console.log(this.props);
        return (
            <>
                {hideHeader ? <HeaderAlt /> : <Header config={config} page={this.props} image={headerImage} />}
                <div id="content" className="site-content">
                    <main id="main" className="site-main inner">
                        <article className="post post-full">
                            <header className="post-header">
                                <h1 className="post-title">{title}</h1>
                                <div className="post-meta">
                                    Published on{' '}
                                    <time className="published" dateTime={dateTimeAttr}>
                                        {formattedDate}
                                    </time>
                                </div>
                            </header>
                            {subtitle && <div className="post-subtitle">{htmlToReact(subtitle)}</div>}
                            {thumbImage && <img className="thumbnail" src={withPrefix(thumbImage)} alt={thumbImageAlt} />}
                            {postDetail &&
                                _.map(postDetail, (detail, index) => {
                                    console.log(detail);
                                    if (detail.description && detail.image) {
                                        return (
                                            <div key={index}>
                                                <img
                                                    style={{ marginTop: '2rem' }}
                                                    className="thumbnail"
                                                    src={withPrefix(getStrapiMedia(detail.image))}
                                                    alt={detail.image.alternativeText}
                                                />
                                                <div style={{ marginTop: '2rem' }} className="post-content">
                                                    {markdownify(detail.description)}
                                                </div>
                                            </div>
                                        );
                                    } else if (detail.image) {
                                        return (
                                            <img
                                                style={{ marginTop: '2rem' }}
                                                className="thumbnail"
                                                src={withPrefix(getStrapiMedia(detail.image))}
                                                alt={detail.image.alternativeText}
                                            />
                                        );
                                    } else if (detail.description) {
                                        return (
                                            <div style={{ marginTop: '2rem' }} className="post-content">
                                                {markdownify(detail.description)}
                                            </div>
                                        );
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
    const props = { posts: await getPosts(), header: await getHeader() };

    return { props };
};

export default withRouter(Post);
