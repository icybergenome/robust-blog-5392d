import React from 'react';
import _ from 'lodash';

import { Layout } from '../components/index';
import Header from '../components/Header';
import FormField from '../components/FormField';
import Footer from '../components/Footer';
import { htmlToReact, markdownify } from '../utils';
import {getStrapiMedia}  from '../utils/strapiMedia'
export default class Contact extends React.Component {
    render() {
        const data = _.get(this.props, 'data');
        const config = _.get(data, 'config');
        const header = _.get(this.props, 'header.header');
        const page = _.get(this.props, 'page.page');
        const title = _.get(page, 'title');
        const subtitle = _.get(page, 'subtitle');
        const headerImage = getStrapiMedia(_.get(header, 'background_img'))
        const markdownContent = _.get(page, 'content[0].markdown_content');
        const formId = _.get(page, 'content[0].form_id');
        const formAction = _.get(page, 'content[0].form_action');
        const formFields = _.get(page, 'content[0].form_fields');
        const submitLabel = _.get(page, 'content[0].submit_label');
        const formHoneypotInputId = formId + '-honeypot';
        const formHoneypotLabelId = formId + '-honeypot-label';
        const formHoneypotName = formId + '-bot-field';

        return (
            <Layout page={page} config={config}>
                <Header config={config} page={this.props} image={headerImage} />
                <div id="content" className="site-content">
                    <main id="main" className="site-main inner">
                        <article className="post page post-full">
                            <header className="post-header">
                                <h1 className="post-title">{title}</h1>
                            </header>
                            {subtitle && <div className="post-subtitle">{htmlToReact(subtitle)}</div>}
                            <div className="post-content">
                                {markdownContent && markdownify(markdownContent)}
                                <form
                                    name={formId}
                                    id={formId}
                                    {...(formAction ? { action: formAction } : null)}
                                    method="POST"
                                    data-netlify="true"
                                    data-netlify-honeypot={formHoneypotName}
                                >
                                    <div className="screen-reader-text">
                                        <label id={formHoneypotLabelId} htmlFor={formHoneypotInputId}>
                                            Don't fill this out if you're human:
                                            <input aria-labelledby={formHoneypotLabelId} id={formHoneypotInputId} name={formHoneypotName} />
                                        </label>
                                    </div>
                                    <input type="hidden" name="form-name" value={formId} />
                                    {_.map(formFields, (field, index) => (
                                        <FormField key={index} field={field} />
                                    ))}
                                    <div className="form-submit">
                                        <button type="submit" className="button">
                                            {submitLabel}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </article>
                    </main>
                    <Footer config={config} />
                </div>
            </Layout>
        );
    }
}
