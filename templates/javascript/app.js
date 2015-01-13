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
  .run(function($rootScope){
    $rootScope.getNgViewScope = function(){
      return (angular.element('div[ng-view]').scope()) ? angular.element('div[ng-view]').scope() : {} ;
    };

    $rootScope.title = '<%= appname %>' ;

  });
