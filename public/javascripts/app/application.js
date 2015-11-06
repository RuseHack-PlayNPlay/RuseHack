var ruseHackApp = angular.module('ruseHackApp', ['ngRoute', 'infinite-scroll']);

ruseHackApp.controller('mainController', function ($q, $scope, $http) {
  $(document).ready(function () {
    new WOW().init();
  });

  window.fbAsyncInit = function () {
    FB.init({
      appId: '641232165979215',
      xfbml: true,
      version: 'v2.5'
    });
  };

  (function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
      return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));


  $scope.userName = "";
  $scope.userMail = "";
  $scope.userId = "";
  $scope.userPic = "";


  $scope.login = function () {
    var user = loginFacebook().then(function (result) {
      $scope.userName = result.name;
      $scope.userMail = result.email;
      $scope.userId = result.id;
      setPic($scope.userId).then(function (response) {
        $scope.userPic = response.data.url;
      })
    })
  };

  function loginFacebook() {
    var deferred = $q.defer();
    FB.login(function (response) {
      if (response.authResponse) {
        FB.api('/me?fields=email,name', function (response) {
          deferred.resolve(response);
        });
      }
    }, {
      scope: 'email'
    });
    return deferred.promise;
  }

  function setPic(id) {
    var defferred = $q.defer();
    FB.api('/' + id + "/picture?type=large", function (response) {
      defferred.resolve(response);
    });
    return defferred.promise;
  }


});