'use strict';

if(!window.console){
  window.console = { log : function(a,b,c,d,e,f,g,h,i){} } ;
}

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
    $rootScope.ajax = [] ;
    $rootScope.$route = $route ;
    $rootScope.$location = $location ;

    $rootScope.title = '<%= appname %>' ;
    $rootScope.keywords = '<%= appname %>' ;
    $rootScope.description = '<%= appname %>' ;
    $rootScope.og_image = 'og-image-200x200.png' ; //200x200

    /*
    push service to ajax array
    $scope.ajax.push( Site.getProduct().success(function(res){ }).error(function(err){  }) );
    */

  });
