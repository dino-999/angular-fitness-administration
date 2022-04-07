// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  newsApiUrl: 'https://localhost:5001/news',
  firebase: {
    apiKey: "AIzaSyBj2B9MEdep0Ejf9IgjnaIKWoaFSB74ekg",
    authDomain: "fitness-app-927c6.firebaseapp.com",
    projectId: "fitness-app-927c6",
    storageBucket: "fitness-app-927c6.appspot.com",
    messagingSenderId: "549431043598",
    appId: "1:549431043598:web:3890e726f49fd7cf153e5f",
    measurementId: "G-7JXF16WJXC"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
