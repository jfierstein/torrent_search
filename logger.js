'use strict';
const bunyan = require('bunyan');
const logger = bunyan.createLogger({
    name: "torrent_search",
    streams: [{
        path: 'torrent_search.log'
    }]
});
module.exports = logger;