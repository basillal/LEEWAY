// const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

// module.exports = withModuleFederationPlugin({

//   name: 'core',

//   exposes: {
//     './Component': './projects/core/src/app/app.component.ts',
//   },

//   shared: {
//     ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
//   },

// });




const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const mf = require("@angular-architects/module-federation/webpack");
const path = require("path");
const share = mf.share;

const sharedMappings = new mf.SharedMappings();
sharedMappings.register(
  path.join(__dirname, '../../tsconfig.json'),[
    /* mapped paths to share */
    // "@libs/left-menu-lib",

  ]);

module.exports = {
  output: {
    uniqueName: "core",
    publicPath: 'http://localhost:4201/',
    scriptType: 'text/javascript',
  },
  optimization: {
    runtimeChunk: false
  },   
  resolve: {
    alias: {
      ...sharedMappings.getAliases(),
    }
  },
  experiments: {
    outputModule: true
  },
  plugins: [
    new ModuleFederationPlugin({
        library: { type: "module" },
        name: "core",
        filename: "remoteEntry.js",
        exposes: {
                './Component': './projects/core/src/app/app.component.ts',
                './UsermanagementModule': './projects/core/src/app/modules/usermanagement/usermanagement.module.ts',
                './DashboardModule': './projects/core/src/app/modules/dashboard/dashboard.module.ts'
              },


              shared: share({
                "@angular/core": { singleton: true, strictVersion: true, requiredVersion: 'auto' }, 
                "@angular/common": { singleton: true, strictVersion: true, requiredVersion: 'auto' }, 
                "@angular/router": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
                ...sharedMappings.getDescriptors()
              })
        
    }),
    sharedMappings.getPlugin()
  ],
};