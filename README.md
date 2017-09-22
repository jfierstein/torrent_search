# torrent_search

NodeJS application to automate finding magnet links from any source based on a search query and seeder threshold.

  - Use any torrent site, just add a couple of methods to implement your preferred source/site
  - Queue up downloads on any torrent client that has a supported javascript API
  
 ### Installation and Usage

Requires [Node.js](https://nodejs.org/) v7.7+ to run.

Install dependencies
```sh
$ npm install
```
Give it the keyword and the seeder threshold and it will save results to torrent_search.log, errors are logged to errors.log
```sh
$ node app.js ubuntu 99 
```