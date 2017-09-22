'use strict';

const deluge_ip = '192.168.0.228';
const deluge_port = process.env['DELUGE_PORT'] || '8112';
const deluge_pw = process.env['DELUGE_PW'] || 'deluge';
const download_path =  process.env['DOWNLOAD_PATH'] || '/Downloads';
const deluge_ssl = process.env['DELUGE_USE_SSL'] || false;

module.exports = {
    download_path: download_path,
    deluge_ip: ((deluge_ssl) ? 'https://' : 'http://') + deluge_ip,
    deluge_port: deluge_port,
    deluge_password: deluge_pw
};