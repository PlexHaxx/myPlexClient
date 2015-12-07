var app = angular.module('app', []);

app.controller('mainCtrl', function($scope, $http) {

  var init = function() {
    $http.get('/api')
      .then(function(res) {
        if (res.data === 'OK') {
          $scope.serverOK = true;
        } else {
          $scope.serverOK = false;
        }
        $scope.statusDo();
        $scope.listDo('/library/sections', null);
      });
  }();

  $scope.statusDo = function() {
    $http.get('/api/status')
      .then(function(data) {
        $scope.status = data;
      })
  }

  $scope.listDo = function(uri, parent) {
    console.info('uri %s', uri);
    $scope.isRoot = (uri==='/library/sections');
    $http.get('/api/list/?uri=' + uri)
      .then(function(data) {
        $scope.results = data.data;
      }, function(err) {
        $scope.serverOK = false;
      })
  }

  $scope.getImage = function(uri) {
    console.info('/api/cogerImagen?uri=' + uri);
    // $http.get('/api/cogerImagen?uri=' + uri)
    //   .then(function(data) {
    //     return data.data;
    //   });
  }

});
