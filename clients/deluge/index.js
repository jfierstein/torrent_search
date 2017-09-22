'use strict';

const config = require('clients/deluge/config');
const log = require('logger');

let delugeUrl = config.deluge_ip;
delugeUrl = (delugeUrl.substring(delugeUrl.length-1) == "/") ? delugeUrl.substring(delugeUrl.length-1) : delugeUrl;
const delugePort = config.deluge_port;
const delugeEndpoint = delugeUrl + ':' + delugePort + '/json';
const deluge = require('deluge')(delugeEndpoint, config.deluge_password);

let provide = {};

provide.addTorrent = (torrent) => {
  return new Promise((resolve, reject) => {
      deluge.add(torrent.link, config.download_path, (error, result) => {
          if (error) reject(error);
          resolve(result);
      });         
  });
}

provide.queueAllTorrents = async (torrents) => {
  return new Promise((resolve, reject) => {
    try {
      deluge.getHosts((error, hosts) => {
        if(error) reject(error);
        log.debug(hosts.length + " deluge host(s) found.");
        if(hosts.length == 0) reject("No deluge host(s) found");
        log.debug("Attempting to connect to deluge server...");
        deluge.connect(hosts[0].id, async (error, result) => {
          if(error) reject(error);
          log.debug("Successfully connected to deluge.");
          log.debug("Attempting to add torrents...");
          let promises = [];
          torrents = Array.isArray(torrents) ? torrents : [torrents];
          torrents.forEach((torrent) => {
            promises.push(provide.addTorrent(torrent));
          });
          await Promise.all(promises);
          resolve();
        });
      });
    }
    catch(e) {
      log.error(e);
    }
  });
}
module.exports = provide;