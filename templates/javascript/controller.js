'use strict';

angular.module('<%= scriptAppName %>')
  .controller('<%= classedName %>Ctrl', function ($scope,$q <% if( name == 'signin'){ %>,APIURL<% } %>) {

    <% if( activeView ){ %>
    var ajax = [];
    $scope.activeView = '<%= activeView %>';
    $scope.subTitle = '<%= activeView %>';
    $scope.page_keywords = '' ;
    $scope.page_description = '' ;
    $scope.page_og_image = '';

    <% if( name == 'signin'){ %>
    /*
    $scope.pass = function(token){
      $http.get(APIURL+'/f/users',{ headers : { Authorization : 'bearer '+ token } }).success(function(res){ console.log(res);}).error(function(){ swal('授權失敗','','error'); });
    };
    */
    <% } %>


    /*
    ajax.push($http.get('http://api.markchao.org/f/forum/9/38').success(function(){
      console.log('success first');
    }));
    --or--
    ajax.push( Site.getProduct().success(function(res){ }).error(function(err){  }) );
    */



    // current route ajax finish
    $q.all(ajax).then(function(){
      $scope.ajaxReady = true ;
      window.prerenderReady = true;
    });

    <% if( name == 'contact'){ %>
    $scope.address = { selectCity : "台北市" , selectArea : "中正區" , cityCode : "100" } ;
    <% } %>

    <% } %>

  });
