'use strict';

angular.module('myApp.addWeight', [])

.controller('AddWeightController', ['$scope', function($scope) {
  $scope.newWeight = {
    date: new Date(),
    controlweight: 51
  }
}])
.directive('addWeight', function() {
  return {
    templateUrl: 'add-weight/add-weight.html'
  }
});
