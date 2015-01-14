'use strict';

window.prerenderReady = false;

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
  })<% } %>
  .run(function($rootScope,$route,$location){
    $rootScope.$route = $route ;
    $rootScope.$location = $location ;

    $rootScope.title = '<%= appname %>' ;
    $rootScope.keywords = '<%= appname %>' ;
    $rootScope.description = '<%= appname %>' ;
    $rootScope.og_image = 'og-image-200x200.png' ; //200x200

  });
