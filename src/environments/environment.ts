// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import {Environment} from './inteface';

export const environment = {
    production: false,
    firebase: {
        apiKey: 'AIzaSyDcRqNNbfhu32mcFL21mfVXIE0fR1h9Gh8',
        authDomain: 'flowers-99319.firebaseapp.com',
        databaseURL: 'https://flowers-99319.firebaseio.com',
        projectId: 'flowers-99319',
        storageBucket: 'flowers-99319.appspot.com',
        messagingSenderId: '28597777161',
        appId: '1:28597777161:web:837bf432fc4636d98b59d8'
    },
    fullpage: {
        apiKey: '1776F746-BA4440A8-9E51D190-761CE70C',
        fadingEffectKey: 'Z2l0aHViLmlvX3ZkOFptRmthVzVuUldabVpXTjBLS2o='
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
