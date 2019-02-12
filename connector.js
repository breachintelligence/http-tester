class Connector {
  constructor(log) {
    this.log = log;
  }
  connect(options, cb) {
    throw new Error('Connect method must be implemented by child class');
  }
}

module.exports = Connector;
