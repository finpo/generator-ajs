'use strict';

angular
  .module('<%= scriptAppName %>', [<%= angularModules %>])<% if (ngRoute) { %>
  .config(function ($routeProvider,$locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

      $locationProvider.html5Mode(true).hashPrefix('!');
  })<% } %>;
