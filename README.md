
# blockchain-client

## Info
Work only with `develop` branch

## Links
http://blockchain-client.iskytest.com - test server for Developers (client part)
http://blockchain-client.iskytest.com/admin - test server for Developers (admin part)
http://kazclient.unicef.io - production server (client part)
http://kazclient.unicef.io/admin - production server (admin part)

## Project structure
- [`src`](#src)
  - [`api`](#api)
  - [`assets`](#assets)
  - [`i18c`](#i18c)
  - [`layouts`](#layouts)
  - [`modules`](#modules)
  - [`plugins`](#plugins)
  - [`router`](#router)
  - [`shared`](#shared)
  - [`store`](#store)

#### `api`
Axios init file

#### `assets`
Style files(partials, variables, mixins, reset) + logo.

#### `i18c`
Localization files

#### `layouts`
Main layout

#### `modules`
Big modules of project which have their own components, containers, layouts, routes, store:

    - "Admin" - module for admin part of the application

    - "Auth" - module concerning authorization

    - "Dashboard" - module for client part of the application


#### `plugins`
Vuetify

To keep the `main.js` file clean, better set plugin settings in own file 
then import in `main.js`

#### `router`
Main file for routes

#### `shared`
For reusable components and functions

Contains:

    - global components
    
    - helpres functions

#### `store`
Global store files

### Build Setup

``` bash
# clone repo
git clone https://dev.iskyweb.com/dneprm/blockchain-client.git -b develop

# install packages and serve with hot reload at localhost:8080 (at dev mode) or build for production with minification (for prod mode)
docker-compose up
```