# Polarity HTTP Tester

## Overview

The HTTP Tester is a command line tool for testing HTTP settings on Polarity servers for connecting to various integrations.as it relates to con.  It provides a simple way to test various HTTP configurations if you are having trouble configuring your integration.  The HTTP Tester tool provides extensive debug logging to assist with configuration.  Once you have determined the correct settings you can apply the settings to your Polarity server.

## Installation

Clone the repo onto your Polarity Server

```
git clone https://github.com/breachintelligence/http-tester.git
```

Run `npm install` from inside the cloned http-tester folder


```
npm install
```

If you cannot install the dependencies on your sever using `npm inatall` then you can download the full release from the github repo here
https://github.com/breachintelligence/http-tester/releases

After downloading the full release, upload the `tgz` file to your Polarity Server and untar it

```
tag -xvzf <file>
```

Note that to run the below commands you may need to make the `http-tester.sh` script executable

```
chmod a+x http-tester.sh
```

The HTTP tester can be placed anywhere on your Polarity Server and does not need to exist inside `/app`.

## Commands

### General Options

#### --config (required)

The path to the config file.  Note that if using a relative path the path should start with a `.`.  For example,
if your config is located in the root of the ldap-tester folder you would pass the following:

```
./http-tester.sh --config ./misp.config.js
```

> You can find sample configs in the `sample_configs` directory

#### --integration (required)

The name of the integration you are trying to connect to.

```
./http-tester.sh --config ./config/misp.config.js --integration misp
```
Currently we support the following integrations:

* misp

### Show Help

```
./http-tester.sh --help
```

### Connect

This command will connect to the specified integration using the provided config.

```
./http-tester.sh connect --config ./config/misp.config.js --integration misp
```

## Logging & Formatting Output

The tester output can be quite verbose so we recommend saving output to a file

if using `jq` (yum install jq):

```
./http-tester.sh connect --config ./config/misp.config.js --integration misp | jq '.' | tee output.txt
```

If using bunyan

```
./http-tester.sh connect --config ./config/misp.config.js --integration misp | bunyan -o short | tee output.txt
```

Note that if running from the Polarity server you already have bunyan installed and can access by first making it executable:

```
chmod a+x /app/polarity-server/node_modules/bunyan/bin/bunyan
```

Then use the following command:

```
./http-tester.sh connect --config ./config/misp.config.js --integration misp | /app/polarity-server/node_modules/bunyan/bin/bunyan -o short | tee output.txt
```
