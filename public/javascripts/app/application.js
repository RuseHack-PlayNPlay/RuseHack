var ruseHackApp = angular.module('ruseHackApp', ['ngRoute', 'infinite-scroll']);

function ruseHackAppConfig($routeProvider) {
  $routeProvider.when('/', {
    controller: 'mainController'
  }).when('/movie/:category', {
    controller: 'movieController',
    templateUrl: 'movies.html'
  })

      .otherwise({
        redirectTo:'/index.html'
      });
}
ruseHackApp.config(ruseHackAppConfig);

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

  $scope.userName = "user";
  $scope.userMail = "";
  $scope.userId = "";
  $scope.userPic = "";
  $scope.categoryButtonsVisibility = "display:none";
  $scope.loginButtonVisibility = "display: inline";
  $scope.userPicVisibility = "visibility: hidden";

  $scope.login = function () {
    var user = loginFacebook();
    user.then(function (result) {
      $scope.userName = result.name;
      $scope.userMail = result.email;
      $scope.userId = result.id;
      setPic(result.id).then(function (response) {
        $scope.userPic = response.data.url;
        $scope.categoryButtonsVisibility = "display:inline";
        $scope.loginButtonVisibility = "display: none";
        $scope.userPicVisibility = "visibility: visible";
      })
    });
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

ruseHackApp.controller('movieController', function ($scope, $http, $routeParams) {
  $scope.movieList = [
    {id: 1, title: "Title", trailerUrl: 'URL'},
    {id: 2, title: "Title", trailerUrl: 'URL'},
    {id: 3, title: "Title", trailerUrl: 'URL'},
    {id: 4, title: "Title", trailerUrl: 'URL'},
    {id: 5, title: "Title", trailerUrl: 'URL'}
  ];

  $scope.addMoreItem = function () {
    console.log("asd");
  }
});
