export function getStrapiURL(path = '') {
    return `${process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337'}${path}`;
}

export function getStrapiMedia(media) {
    const imageUrl = media ? (media.url.startsWith('/') ? getStrapiURL(media.url) : media.url) : '';
    return imageUrl;
}
