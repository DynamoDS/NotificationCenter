# NotificationCenter
Dynamo Notification Center WebApp which is leveraged in Dynamo. This can also be leveraged by any products that needs a notification center.

---
## Requirements

For development, you will only need Node.js and a node global package, installed in your environement.

### Node
- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the LTS installer.
Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command (version outputs are just examples).

    $ node --version
    v16.16.0

    $ npm --version
    8.15.0

If you need to update `npm`, you can make it using `npm`!

    $ npm install npm -g

---

## Install

    $ git clone https://github.com/DynamoDS/NotificationCenter
    $ cd NotificationCenter
    $ npm install --force


## Running the project

    $ npm run start

## Simple build for development

    $ npm run build

## Simple build for production

    $ npm run bundle

## Simple build for production ready npm package

    $ npm run production