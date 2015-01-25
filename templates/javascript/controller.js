'use strict';

angular.module('<%= scriptAppName %>')
  .controller('<%= classedName %>Ctrl', function ($scope,$q,$http <% if( name == 'signin'){ %>,APIURL<% } %>) {
    <% if( activeView ){ %>
    $scope.activeView = '<%= activeView %>';
    $scope.subTitle = '<%= activeView %>';
    $scope.page_keywords = '' ;
    $scope.page_description = '' ;
    $scope.page_og_image = '';

    <% if( name == 'signin'){ %>
    $scope.pass = function(token){
      $http.get(APIURL+'/f/users',{ headers : { Authorization : 'bearer '+ token } }).success(function(res){ console.log(res);}).error(function(){ swal('授權失敗','','error'); });
    };
    <% } %>


    var ajax = [];

    ajax.push($http.get('http://api.markchao.org/f/forum/9/38').success(function(){
      console.log('success first');
    }));
    ajax.push($http.get('http://api.markchao.org/f/forum/9/38').success(function(){
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
