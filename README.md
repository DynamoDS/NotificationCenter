# NotificationCenter

[![License](https://img.shields.io/npm/l/@dynamods/notifications-center)](https://github.com/DynamoDS/NotificationCenter/blob/master/LICENSE)

[![version](https://img.shields.io/npm/v/@dynamods/notifications-center?logo=npm&label=version)](https://www.npmjs.com/package/@dynamods/notifications-center)

[![Build](https://github.com/DynamoDS/NotificationCenter/actions/workflows/build.yml/badge.svg)](https://github.com/DynamoDS/NotificationCenter/actions/workflows/build.yml)

[![Publish](https://github.com/DynamoDS/NotificationCenter/actions/workflows/npm-publish.yml/badge.svg)](https://github.com/DynamoDS/NotificationCenter/actions/workflows/npm-publish.yml)

Dynamo Notification Center WebApp which is leveraged in Dynamo. This can also be leveraged by any products that needs a notification center.

---

## Requirements

For development, you will only need Node.js and a node global package, installed in your environement.

### Node

- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the LTS installer. Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

  ```shell
  sudo apt install nodejs
  sudo apt install npm
  ```

- #### Other Operating Systems

  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

  If the installation was successful, you should be able to run the following command (version outputs are just examples).

  ```shell
  $ node --version
  v16.16.0

  $ npm --version
  8.15.0
  ```

  If you need to update `npm`, you can make it using `npm`!

  ```shell
  npm install npm -g
  ```

---

## Install

```shell
git clone https://github.com/DynamoDS/NotificationCenter
cd NotificationCenter
npm install --force
```

### Notification endpoint

 Notification endpoints for different environments are set in `.env` files in [config](config) folder. Webpack will load the correct `.env` file according to `--env` flag passed to it. [More info](https://webpack.js.org/api/cli/#environment-options)

## Running the project

```shell
npm run start:dev     # start with dev notification url
npm run start:staging # start with staging notification url
npm run start         # start with prod notification url
```

## Building the project

```shell
npm run build:dev     # build with dev notification url
npm run build:staging # build with staging notification url
npm run build         # build with prod notification url
npm run bundle        # build without notification url
```

## Lint

We use [ESlint](https://eslint.org/) to analyze and find problems. It has [integrations](https://eslint.org/docs/latest/user-guide/integrations) for various editors and other tools.

```shell
npm run lint:check  # To find problems
npm run lint:fix    # To fix problems
```

## Test

We use [jest](https://jestjs.io/) to run our tests.

```shell
npm run test:unit   # To run unit test
npm run test:e2e    # To run e2e test
npm run test        # To runs all tests along with lint
```

## Generate Third Party License Info

- To generate about box html files use `npm run generate_license`, this will output alternative about box files to [license_output](license_output). One will contain the full transitive production dep list, the other will contain the direct production deps.
- These files will be packed into the released npm package
