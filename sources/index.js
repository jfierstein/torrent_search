'use strict';

const request = require('request-promise-native');
const log = require('logger');
const cheerio = require('cheerio');

let provide = {};

provide.query = async (query, src) => {
    const source = require(src);
    provide.source_name = source.source_name;
    log.info('Querying ' + src + ' for ' + 'search term "' + query + '"...');
    const url = source.queryUrls.seeds_desc(query);
    const body = await request.get(url);
    const anchors = parseHtml(body);
    return source.parseLinks(anchors);
}

const parseHtml = (html) => {
    const $ = cheerio.load(html);
    let anchors = [];
    $('a').each((i, elem) => anchors.push(elem));
    return anchors;
}

module.exports = provide;