'use strict';

angular
  .module('questionnaireSiteApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute'
  ])
    .run(function() {

        Parse.initialize("LMeDCE6Wi9C5Z8e48MFnxtQZATVHqf8Y1dq52Rit", "iMIeFm80o6fneH526wSbwBZ52NfzoJVDbpfGnw2t");

    })
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
