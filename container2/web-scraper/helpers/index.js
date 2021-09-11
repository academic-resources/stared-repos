/**
 * Modify the url to absolute if relative
 * @param url
 * @param base
 * @return url
 */
var getAbsoluteUrl = (url, base) => {
    if (url && url.length > 1 && url[0] == '/') {
        url = base + url;
    }

    return url;
}

module.exports = {
    getAbsoluteUrl
};