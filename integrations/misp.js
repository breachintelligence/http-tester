const Connector = require('../connector');
const request = require('request');
const _ = require('lodash');

class Misp extends Connector {
  connect(options, cb) {
    const self = this;
    const requestOptions = {
      uri: `${options.url}/tags/tagStatistics`,
      method: 'GET',
      json: true,
      headers: {
        Authorization: options.apiKey
      }
    };

    const mergedRequestOptions = _.merge({}, requestOptions, options.request);

    this.log.info({ mergedRequestOptions }, 'HTTP Request Options');

    request(mergedRequestOptions, (err, response, body) => {
      cb(err, response, body);
    });
  }
}

module.exports = Misp;
