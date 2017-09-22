'use strict';

require('app-module-path').addPath(__dirname);
const log = require('logger');
const deluge = require('clients/deluge');
const config = require('config');
const file = require('file');
const stringSimilarity = require('string-similarity');
const source = require('sources');

//
const removeSceneTagsFromName = (name) => {
  config.known_tags.forEach((tag) => { name = name.replace(tag, ""); });
  return name;
}

const filterNewLinks = (links, prevdls) => {
  const newLinks = links.filter((link) => {   
    const alreadyDownloaded = prevdls.some((name) => { 
      const compareName = removeSceneTagsFromName(name.toLowerCase());
      const compareLinkName = removeSceneTagsFromName(link.name.toLowerCase());
      return (stringSimilarity.compareTwoStrings(compareLinkName, compareName) > config.similarityThreshold) 
    });
    const hasSeeders = (link.seeders > config.seedThreshold);
    return (!alreadyDownloaded && hasSeeders);
  });
  log.info("Found " + newLinks.length + " new items!");
  return newLinks;
}

const search = async () => {
  try {
    //load log of already downloaded items
    const logJsonString = await file.loadFile(__dirname + "/data/download_log.json");
    let previouslyDownloaded = JSON.parse(logJsonString);
    //query the torrent site from /sources (piratebay, kickass, skytorrents)
    const foundLinks = await source.query(config.search_query, __dirname + "/sources/" + config.source);
    const newLinks = filterNewLinks(foundLinks, previouslyDownloaded); 
    if(newLinks.length == 0) return;
    await deluge.queueAllTorrents(newLinks);
    await file.saveFile(__dirname + "/data/new_downloads.json", newLinks);
    await file.saveFile(__dirname + "/data/download_log.json", previouslyDownloaded.concat(newLinks.map(n => n.name)));
  }
  catch(error) { 
    log.error(error);
    await file.saveFile(__dirname + "error.log", error);
  }
  finally { return };
}
if(!config.search_query) {
  log.error("No query provided. Done.");
  process.exit(1);
}

const main = async () => {
  await search();
  process.exit(1);
}
log.level(config.log_level);
main();