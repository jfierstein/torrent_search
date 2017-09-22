'use strict';
const fs = require('fs');
const log = require('logger');

let provide = {};

provide.saveFile = (filename, obj) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(filename, JSON.stringify(obj), { encoding: 'utf8' }, (err) => {
      if (err) reject(err);
      log.debug("Successfully saved " + filename);
      resolve();
    });
  });
}

provide.loadFile = (filename) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, 'utf8', (error, data) => {
       if(error) reject(error);
       log.debug("Successfully loaded " + filename);
       resolve(data);
    });
  });
}

module.exports = provide;