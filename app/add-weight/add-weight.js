'use strict';

angular.module('myApp.addWeight', [])

.controller('AddWeightController', function($scope, WeightItem) {
  $scope.newWeight = new WeightItem();

  $scope.newWeight.date = new Date();
  $scope.newWeight.controlweight = 51;

  $scope.addWeight = function(weight) {
    console.log(weight);
    weight.$save().then(function(){

    }).catch(function(errors){
      //validations
    }).finally(function(){
      $scope.$emit('weightAdded');
    });
  };

})
.directive('addWeight', function() {
  return {
    templateUrl: 'add-weight/add-weight.html'
  }
});
