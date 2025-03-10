// const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

// module.exports = withModuleFederationPlugin({

//   remotes: {
//     "core":  "http://localhost:4201/remoteEntry.js",
//   },

//   shared: {
//     ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
//   },
//   experiments: {
//     outputModule: true
//   },
//   output: {
//     libraryTarget: 'module'
//   }

// });

// const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

// module.exports = {
//   experiments: {
//     outputModule: true
//   },
//   output: {
//     libraryTarget: 'module'
//   },
//   ...withModuleFederationPlugin({
//     remotes: {
//       "core": "http://localhost:4201/remoteEntry.js",
//     },
//     shared: {
//       "@angular/core": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
//       "@angular/common": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
//       "@angular/router": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
//       "@angular/forms": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
//       ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
//     },
//   })
// };
const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({
  remotes: {
    "core": "http://localhost:4201/remoteEntry.js",
  },
  shared: {
    "@angular/core": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
    "@angular/common": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
    "@angular/router": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
    "@angular/forms": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  }
});



// const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

// module.exports = withModuleFederationPlugin({
//   remotes: {
//     "secondProject": "http://localhost:4201/remoteEntry.js"
//   },
//   shared: {
//     ...shareAll({ 
//       singleton: true, 
//       strictVersion: false,
//       requiredVersion: 'auto' 
//     })
//   }
// });