# liesmich
{{ template:badges }}
## Packages
| Package | NPM | Coverage |
| --- | --- | --- |
| [vehicle-location-diff](https://github.com/liesmich/liesmich/tree/master/packages/vehicle-location-diff) | [![npm version](https://badge.fury.io/js/%40liesmich%2Fvehicle-location-diff.svg)](https://badge.fury.io/js/%40liesmich%2Fvehicle-location-diff) | [![codecov](https://codecov.io/gh/liesmich/liesmich/branch/master/graph/badge.svg?flag=VehicleLocationDiff)](https://codecov.io/gh/liesmich/liesmich/tree/master/packages/vehicle-location-diff) |
| [api-client](https://github.com/liesmich/liesmich/tree/master/packages/api-client) | [![npm version](https://badge.fury.io/js/%40liesmich%2Fapi-client.svg)](https://badge.fury.io/js/%40liesmich%2Fapi-client) | [![codecov](https://codecov.io/gh/liesmich/liesmich/branch/master/graph/badge.svg?flag=ApiClient)](https://codecov.io/gh/liesmich/liesmich/tree/master/packages/api-client) |
| [api-types](https://github.com/liesmich/liesmich/tree/master/packages/api-types) | [![npm version](https://badge.fury.io/js/%40liesmich%2Fapi-types.svg)](https://badge.fury.io/js/%40liesmich%2Fapi-types) | [![codecov](https://codecov.io/gh/liesmich/liesmich/branch/master/graph/badge.svg?flag=ApiTypes)](https://codecov.io/gh/liesmich/liesmich/tree/master/packages/api-types) |
| [api-proxy-server](https://github.com/liesmich/liesmich/tree/master/packages/api-proxy-server) | [![npm version](https://badge.fury.io/js/%40liesmich%2Fapi-proxy-server.svg)](https://badge.fury.io/js/%40liesmich%2Fapi-proxy-server) | [![codecov](https://codecov.io/gh/liesmich/liesmich/branch/master/graph/badge.svg?flag=ApiProxyServer)](https://codecov.io/gh/liesmich/liesmich/tree/master/packages/api-proxy-server) |
| [api-proxy-router](https://github.com/liesmich/liesmich/tree/master/packages/api-proxy-router) | [![npm version](https://badge.fury.io/js/%40liesmich%2Fapi-proxy-router.svg)](https://badge.fury.io/js/%40liesmich%2Fapi-proxy-router) | [![codecov](https://codecov.io/gh/liesmich/liesmich/branch/master/graph/badge.svg?flag=ApiProxyRouter)](https://codecov.io/gh/liesmich/liesmich/tree/master/packages/api-proxy-router) |
| [client-ng](https://github.com/liesmich/liesmich/tree/master/packages/client-ng) | [![npm version](https://badge.fury.io/js/%40liesmich%2Fclient-ng.svg)](https://badge.fury.io/js/%40liesmich%2Fclient-ng) | [![codecov](https://codecov.io/gh/liesmich/liesmich/branch/master/graph/badge.svg?flag=ClientNg)](https://codecov.io/gh/liesmich/liesmich/tree/master/packages/client-ng) |
| [client-desktop](https://github.com/liesmich/liesmich/tree/master/packages/client-desktop) | [![npm version](https://badge.fury.io/js/%40liesmich%2Fclient-desktop.svg)](https://badge.fury.io/js/%40liesmich%2Fclient-desktop) | [![codecov](https://codecov.io/gh/liesmich/liesmich/branch/master/graph/badge.svg?flag=ClientDesktop)](https://codecov.io/gh/liesmich/liesmich/tree/master/packages/client-desktop) |
| [vehicle-cache](https://github.com/liesmich/liesmich/tree/master/packages/vehicle-cache) | [![npm version](https://badge.fury.io/js/%40liesmich%2Fvehicle-cache.svg)](https://badge.fury.io/js/%40liesmich%2Fvehicle-cache) | [![codecov](https://codecov.io/gh/liesmich/liesmich/branch/master/graph/badge.svg?flag=VehicleCache)](https://codecov.io/gh/liesmich/liesmich/tree/master/packages/vehicle-cache) |
| [express-utils](https://github.com/liesmich/liesmich/tree/master/packages/express-utils) | [![npm version](https://badge.fury.io/js/%40liesmich%2Fexpress-utils.svg)](https://badge.fury.io/js/%40liesmich%2Fexpress-utils) | [![codecov](https://codecov.io/gh/liesmich/liesmich/branch/master/graph/badge.svg?flag=ExpressUtils)](https://codecov.io/gh/liesmich/liesmich/tree/master/packages/express-utils) |

## Build & Test
Before you either do both run:

    npm install
    npx lerna bootstrap --no-ci
    npm run build

This project does use [lerna](https://github.com/lerna/lerna) so all common [commands](https://github.com/lerna/lerna/tree/master/commands) should work from the root directory!
Due to packages depending on each other a build is **required** first before running tests!

### Build & Test all packages

    npm run build
    npm run test

### Build & Test a specific package
    npx lerna run build --scope=@liesmich/api-types
    npx lerna run test --scope=@liesmich/api-types


{{package_table}}
