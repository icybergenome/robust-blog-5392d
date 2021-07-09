import _ from 'lodash';
import withPrefix from './withPrefix';

export default function getPageUrl(post, { withPrefix: addPrefix = false } = {}) {
    const urlPath = _.get(post, 'slug');
    return addPrefix ? withPrefix("post/"+urlPath) : urlPath;
}
