'use strict';

angular.module('myApp.dashboard', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/dashboard', {
    templateUrl: 'dashboard/dashboard.html',
    controller: 'DashboardController'
  });
}])

.controller('DashboardController', ['$scope', 'WeightItem', function($scope, WeightItem) {

  $scope.table1 = WeightItem.query();

  $scope.$on('weightAdded', function(event) {
    $scope.table1 = WeightItem.query();
  });

}]);
