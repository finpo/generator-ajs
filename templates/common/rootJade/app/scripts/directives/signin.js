'use strict';

angular.module('signin',[])
  .directive('signin', function () {
    return {
      templateUrl: 'views/directives/signin.html',
      restrict: 'E',
      scope : {
        pass : '='
      },
      controller : function($scope, $interval , $http , APIURL){

        $scope.signUpData = {};
        $scope.signInData = {};

        $scope.signUp = function(){
          $http.post(APIURL+'/f/auth/signup',$scope.signUpData).success(function(res){
            $http.post(APIURL+'/f/auth/signin',$scope.signUpData).success(function(res){
              $scope.pass(res.token);
            }).error(function(res){
              swal('ERROR','發生錯誤了.. 請檢查您填寫的資料，或服務主機發生問題','error');
            });
          }).error(function(res){
            swal('ERROR','發生錯誤了.. 請檢查您填寫的資料，或服務主機發生問題','error');
          });
        };

        $scope.signIn = function(){
          $http.post(APIURL+'/f/auth/signin',$scope.signInData).success(function(res){
            $scope.pass(res.token);
          }).error(function(res){
            swal('ERROR','發生錯誤了.. 請檢查您填寫的資料，或服務主機發生問題','error');
          });
        };

        $scope.thirdPartySignIn = function(service){
          switch ( service ){
            case "facebook" :
              var wWidth = 1024 ;
              var wHeight = 650 ;
              break ;
            case "yahoo" :
              var wWidth = 565 ;
              var wHeight = 500 ;
              break ;
            default :
              var wWidth = 400 ;
              var wHeight = 500 ;
              break ;
          }
          var dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : screen.left;
          var dualScreenTop = window.screenTop !== undefined ? window.screenTop : screen.top;

          var width = window.innerWidth || documentElement.clientWidth || screen.width;
          var height = window.innerHeight || documentElement.clientHeight || screen.height;

          var left = ((width - wWidth) / 2) + dualScreenLeft;
          var top  = dualScreenTop + 100;


          $scope.popup = window.open(APIURL+'/f/auth/'+service,"_blank", "resizeable=true,width="+wWidth+",height="+wHeight+",left=" + left + ",top=" + top );
          function receiveMessage(event){
            if( event.data ){
              $scope.token = event.data ;
              if(!$scope.popup.closed){
                $scope.popup.postMessage('got_token',APIURL);
              }
              $interval.cancel($scope.fbInterval);
            }
          }
          $scope.fbInterval = $interval(function(){
            if($scope.popup.closed){
              $interval.cancel($scope.fbInterval);
              window.removeEventListener("message", receiveMessage, false);
            }else{
              $scope.popup.postMessage('token',APIURL);
            }
          },500);
          window.addEventListener("message", receiveMessage, false);
        }

        $scope.$watch('token' , function(n,o){
          if(n){
            $scope.pass(n);
          }
        });
        //end
      }
    };
  });
