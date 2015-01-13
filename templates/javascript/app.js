'use strict';

angular
  .module('<%= scriptAppName %>', [<%= angularModules %>])<% if (ngRoute) { %>
  .config(function ($routeProvider,$locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/contact', {
        templateUrl: 'views/contact.html',
        controller: 'ContactCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

      $locationProvider.html5Mode(true).hashPrefix('!');
  })<% } %>
  .run(function($rootScope){
    $rootScope.getNgViewScope = function(){
      return (angular.element('div[ng-view]').scope()) ? angular.element('div[ng-view]').scope() : {} ;
    };

  });
