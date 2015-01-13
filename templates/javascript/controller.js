'use strict';

angular.module('<%= scriptAppName %>')
  .controller('<%= classedName %>Ctrl', function ($scope,$q,$http) {
    <% if( activeView ){ %>
    $scope.activeView = '<%= activeView %>';
    $scope.subTitle = '<%= activeView %>';

    var ajax = [];

    ajax.push($http.get('http://dev.finpo.com.tw/markchao-api/public/f/forum/9/38').success(function(){
      console.log('success first');
    }));
    ajax.push($http.get('http://dev.finpo.com.tw/markchao-api/public/f/forum/9/38').success(function(){
      console.log('success second');
    }));

    // all ajax finish
    $q.all(ajax).then(function(){
      $scope.ajaxReady = true ;
      window.prerenderReady = true;
    });

    <% if( name == 'contact'){ %>
    $scope.address = { selectCity : "台北市" , selectArea : "中正區" , cityCode : "100" } ;
    <% } %>

    <% } %>

  });
