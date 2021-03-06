# webpack-conf-cli

webpack config generate cli

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/webpack-conf-cli.svg)](https://npmjs.org/package/webpack-conf-cli)
[![Downloads/week](https://img.shields.io/npm/dw/webpack-conf-cli.svg)](https://npmjs.org/package/webpack-conf-cli)
[![License](https://img.shields.io/npm/l/webpack-conf-cli.svg)](https://github.com/https://github.com/wzhkobe2408/repo/https://github.com/owner/webpack-conf-cli/blob/master/package.json)

<!-- toc -->
* [webpack-conf-cli](#webpack-conf-cli)
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->

# Usage

<!-- usage -->
```sh-session
$ npm install -g webpack-conf-cli
$ wpconf COMMAND
running command...
$ wpconf (-v|--version|version)
webpack-conf-cli/1.0.9 darwin-x64 node-v10.13.0
$ wpconf --help [COMMAND]
USAGE
  $ wpconf COMMAND
...
```
<!-- usagestop -->

# Commands

<!-- commands -->
* [`wpconf help [COMMAND]`](#wpconf-help-command)
* [`wpconf image-loader [FILENAME]`](#wpconf-image-loader-filename)
* [`wpconf init [FILENAME]`](#wpconf-init-filename)
* [`wpconf js-loader [FILENAME]`](#wpconf-js-loader-filename)
* [`wpconf less-loader [FILENAME]`](#wpconf-less-loader-filename)
* [`wpconf rm-config [FILENAME]`](#wpconf-rm-config-filename)
* [`wpconf ts-loader [FILENAME]`](#wpconf-ts-loader-filename)

## `wpconf help [COMMAND]`

display help for wpconf

```
USAGE
  $ wpconf help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.2.0/src/commands/help.ts)_

## `wpconf image-loader [FILENAME]`

Config image loader

```
USAGE
  $ wpconf image-loader [FILENAME]

OPTIONS
  -h, --help  show CLI help

EXAMPLE
  $ wpconf image-loader
```

_See code: [src/commands/image-loader.ts](https://github.com/wzhkobe2408/webpack-conf-cli/blob/v1.0.9/src/commands/image-loader.ts)_

## `wpconf init [FILENAME]`

Init webpack config with simple configuration

```
USAGE
  $ wpconf init [FILENAME]

OPTIONS
  -h, --help   show CLI help
  -m, --multi

EXAMPLE
  $ wpconf init --multi
```

_See code: [src/commands/init.ts](https://github.com/wzhkobe2408/webpack-conf-cli/blob/v1.0.9/src/commands/init.ts)_

## `wpconf js-loader [FILENAME]`

Config js file loader

```
USAGE
  $ wpconf js-loader [FILENAME]

OPTIONS
  -h, --help  show CLI help

EXAMPLE
  $ wpconf js-loader
```

_See code: [src/commands/js-loader.ts](https://github.com/wzhkobe2408/webpack-conf-cli/blob/v1.0.9/src/commands/js-loader.ts)_

## `wpconf less-loader [FILENAME]`

Config less file loader

```
USAGE
  $ wpconf less-loader [FILENAME]

OPTIONS
  -h, --help  show CLI help

EXAMPLE
  $ wpconf less-loader
```

_See code: [src/commands/less-loader.ts](https://github.com/wzhkobe2408/webpack-conf-cli/blob/v1.0.9/src/commands/less-loader.ts)_

## `wpconf rm-config [FILENAME]`

Remove webpack config file

```
USAGE
  $ wpconf rm-config [FILENAME]

OPTIONS
  -h, --help  show CLI help

EXAMPLE
  $ wpconf rm-config
```

_See code: [src/commands/rm-config.ts](https://github.com/wzhkobe2408/webpack-conf-cli/blob/v1.0.9/src/commands/rm-config.ts)_

## `wpconf ts-loader [FILENAME]`

Config ts(x) file loader

```
USAGE
  $ wpconf ts-loader [FILENAME]

OPTIONS
  -h, --help  show CLI help

EXAMPLE
  $ wpconf ts-loader
```

_See code: [src/commands/ts-loader.ts](https://github.com/wzhkobe2408/webpack-conf-cli/blob/v1.0.9/src/commands/ts-loader.ts)_
<!-- commandsstop -->
