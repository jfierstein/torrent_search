'use strict';

const query = process.argv[2] || process.env['SEARCH_QUERY'];
const seedThreshold = parseInt(process.env['SEED_THRESH'],10) || parseInt(process.argv[3], 10) || 50;
const similarityThreshold = parseFloat(process.env['SIMILARITY_THRESH'], 10) || 0.75;
const download_path = process.env['DOWNLOAD_PATH'] || '/Downloads';
const source = process.env['TORRENT_SRC'] || 'skytorrents';
const log_level = process.env['LOG_LEVEL'] || 'info';
const known_tags = ["720p", "x264", "solar", "hdtv", "2011", "2012", "2013", "2014", "2015", "2016", "2017" ,"(2011)", "(2012)", "(2013)", "(2014)", "(2015)", "(2016)", "(2017)"]

module.exports = {
    source: source,
    download_path: download_path,
    search_query: query,
    seedThreshold: seedThreshold,
    similarityThreshold: similarityThreshold,
    log_level: log_level
};