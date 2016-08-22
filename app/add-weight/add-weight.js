'use strict';

angular.module('myApp.addWeight', [])

.controller('AddWeightController', function($scope) {
  $scope.newWeight = {
    'date': new Date(),
    'controlweight': 51
  };

  $scope.addWeight = function() {

  }

})
.directive('addWeight', function() {
  return {
    templateUrl: 'add-weight/add-weight.html'
  }
});
