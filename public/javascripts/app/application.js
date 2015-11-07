var ruseHackApp = angular.module('ruseHackApp', ['ngRoute', 'infinite-scroll', 'services']);

function ruseHackAppConfig($routeProvider) {
  $routeProvider.when('/', {
    controller: 'mainController'
  }).when('/movie/:category', {
    controller: 'movieController',
    templateUrl: 'movies.html'
  })

      .otherwise({
        redirectTo: '/index.html'
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

  $scope.selectCategory = function (id) {
    switch (id) {
      case 0:
      {
        $scope.selectedButton0 = "color:#009bdf; border-color:#009bdf";
        $scope.selectedButton1 = "color:#009bdf; border-color:#009bdf";
      }
    }
  }
});

ruseHackApp.controller('movieController', function ($scope, $http, $routeParams, cache, movieDao) {
  //$scope.movieList = [
  //  {id: 1, title: "Title", trailerUrl: 'URL'},
  //  {id: 2, title: "Title", trailerUrl: 'URL'},
  //  {id: 3, title: "Title", trailerUrl: 'URL'},
  //  {id: 4, title: "Title", trailerUrl: 'URL'},
  //  {id: 5, title: "Title", trailerUrl: 'URL'}
  //];

  $scope.current = 0;
  $scope.step = 10;
  $scope.numberOfItemsToDisplay = 10;
  $scope.movieItems = [];
  $scope.totalCount = 0;
  $scope.categoryCount = 0;
  $scope.items = [];
  $scope.category = $routeParams.category;
  var flag = false;

  cache.init();

  var totalCount = movieDao.getCount();
  totalCount.then(function (result) {
    $scope.totalCount = result;
  });

  var categoryCount = movieDao.getCountByCategory($scope.category);
  categoryCount.then(function (result) {
    $scope.categoryCount = result;
    flag = true;
    getMovies();
  });

  /**
   * Load movie item in controller scope.
   */
  function getMovies() {
    if (flag == true) {
      flag = false;

      /**
       * if cash take from the cache else call function fromServer().
       */
      var items = cache.select($scope.category, $scope.current, $scope.step);
      items.then(function (result) {
        $scope.items = result;
        if (result.length > 0 || undefined || null) {

          console.log($scope.items = result)
          addItems();
        } else {
          console.log("from server")
          fromServer();
        }
      }, function (data) {
        console.log(data);
      });

      /**
       * Get item list from server and save in cache.
       *
       */
      function fromServer() {
        var it = movieDao.getMovieByCategory($scope.category, $scope.current, $scope.step);
        it.then(function (result) {
          $scope.items = result;
          addItems();
        }).then(function () {
          cache.insert($scope.items);
        });
      }

      /**
       * Push buffer scope in master scope.
       */
      function addItems() {
        for (var i = 0; i < $scope.items.length; i++) {
          $scope.movieItems.push($scope.items[i]);
        }
        $scope.current = $scope.movieItems.length;
        flag = true;
      }
    }
  }
  /**
   * add movie item
   */
  $scope.addMoreItem = function () {
    if ($scope.numberOfItemsToDisplay < $scope.categoryCount) {
      getMovies();
      console.dir($scope.movieItems)
      if ($scope.movieItems.length >= $scope.numberOfItemsToDisplay) {
        $scope.numberOfItemsToDisplay += 10;
      }
    }
  };
});
