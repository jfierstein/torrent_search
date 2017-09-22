'use strict';

const baseUrl = "https://skytorrents.in/search/all/";
const sortParams = {
    seeds_desc : "ed",
    latest : "ad"
};
const page = 1;

let provide = {};

provide.queryUrls = {
    seeds_desc : (query) => { return baseUrl + sortParams.seeds_desc + '/' + page + '/?q=' + query; },
    latest: (query) => { return baseUrl + sortParams.latest + '/' + page + '/?q=' + query; }
};

const getName = (element) => {
    if (!(element.attribs && element.attribs['href'] && element.attribs['href'].substring(0, 5) == "/info"))
        return getName(element.prev);
    return (element.children[0].data);
}

const getSeeders = (element) => {
    return element.parent.parent.children[6].children[0].data;
}

provide.parseLinks = (anchors) => {
  let links = [];
  anchors.forEach((item) => {
    if(item.attribs) {
      var href = item.attribs['href'];
      var isMagnet = (href.substring(0, 6) == "magnet");
      if (isMagnet) {
        links.push({
            link: href,
            name: getName(item),
            seeders: getSeeders(item)
        });
      }
    }
  });
  return links;
}

provide.name = "skytorrents";

module.exports = provide;