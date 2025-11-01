// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: true,
    mfe: {
        admissions: 'http://localhost:4201',
        core: 'http://localhost:4202',
        sim: 'http://localhost:4203',
        applicant: 'http://localhost:4204',
        hr:'http://localhost:4205'
    },
    publicPath: 'http://localhost:4200/',
    baseUrl: 'http://172.21.14.247:8080/api/',
    project: 'shell',
    baseRoute: 'kjusys',
    local: true,
  };
  
  /*
   * For easier debugging in development mode, you can import the following file
   * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
   *
   * This import should be commented out in production mode because it will have a negative impact
   * on performance if an error is thrown.
   */
  // import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
  