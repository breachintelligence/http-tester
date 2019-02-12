const bunyan = require('bunyan');
const fs = require('fs');
const _ = require('lodash');
const Misp = require('./integrations/misp');

const log = bunyan.createLogger({
  name: 'HTTP',
  level: 'trace'
});

const connect = {
  command: 'connect',
  desc: 'Test a connection against the provided service',
  handler: (argv) => {
    log.info('Creating MISP connector');
    const config = processConfig(readConfig(argv));
    log.info({ environment: process.env }, 'Environment before setting options');
    loadEnvironmentVars(config);
    log.info({ environment: process.env }, 'Environment after setting options');
    const misp = new Misp(log);
    log.info('Connecting ...');
    misp.connect(
      config,
      (err, response, body) => {
        if (err) {
          log.error(err, 'There was an error attempting to connect');
        } else {
          log.info({ response: response }, 'Response');
          log.info('DONE!');
        }
      }
    );
  }
};

function readConfig(argv) {
  let config = require(argv.config);
  config.log = log;
  return config;
}

function processConfig(config) {
  const parsedConfig = _.cloneDeep(config);
  if (typeof config.request.cert === 'string' && config.request.cert.length > 0) {
    parsedConfig.request.cert = fs.readFileSync(config.request.cert);
  }

  if (typeof config.request.key === 'string' && config.request.key.length > 0) {
    parsedConfig.request.key = fs.readFileSync(config.request.key);
  }

  if (typeof config.request.passphrase === 'string' && config.request.passphrase.length > 0) {
    parsedConfig.request.passphrase = config.request.passphrase;
  }

  if (typeof config.request.ca === 'string' && config.request.ca.length > 0) {
    parsedConfig.request.ca = fs.readFileSync(config.request.ca);
  }

  if (typeof config.request.proxy === 'string' && config.request.proxy.length > 0) {
    parsedConfig.request.proxy = config.request.proxy;
  }

  if (typeof config.request.rejectUnauthorized === 'boolean') {
    parsedConfig.request.rejectUnauthorized = config.request.rejectUnauthorized;
  }
  return parsedConfig;
}

function loadEnvironmentVars(config) {
  log.info('Setting environment variables from config');
  if (config.environment) {
    for (const key in config.environment) {
      const value = config.environment[key];
      if (value === null) {
        if (typeof process.env[key] !== 'undefined') {
          log.info(`Removing environment variable [${key}]`);
        }
        delete process.env[key];
      } else {
        process.env[key] = value;
      }
    }
  }
}

const argv = require('yargs')
  .usage('Usage: $0 <command> [options]')
  .command(connect)
  .option('config', {
    alias: 'c',
    type: 'string',
    nargs: 1,
    describe: 'Path to the config.js file',
    demand: 'You must provide the "config" argument'
  })
  .option('integration', {
    alias: 'i',
    type: 'string',
    nargs: 1,
    describe: 'Integration to connect to (valid values are "misp")',
    demand: 'You must provide the "integration" to connect to (valid values are "misp")'
  })
  .help()
  .wrap(null)
  .version('HTTP Tester v' + require('./package.json').version)
  // help
  .epilog('(C) 2019 Breach Intelligence Inc. DBA Polarity').argv;
