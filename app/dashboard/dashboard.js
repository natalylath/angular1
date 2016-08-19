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

  /*$scope.table1 = [
    { id: 5, date: new Date('2016-08-17'), days: 13,  weight: 50, controlweight: 49.7 },
    { id: 4, date: new Date('2016-08-15'), days: 11,  weight: 49, controlweight: 47.6 },
    { id: 3, date: new Date('2016-08-14'), days: 10,  weight: 47.5, controlweight: 47.2 },
    { id: 2, date: new Date('2016-08-13'), days: 9,  weight: 46.8, controlweight: 47  },
    { id: 1, date: new Date('2016-08-12'), days: 8,  weight: 46.0, controlweight: 46.7 }
  ];*/

}]);
