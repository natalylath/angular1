'use strict';

angular.module('myApp.addWeight', [])

.controller('AddWeightController', function($scope, WeightItem) {
  $scope.newWeight = new WeightItem();

  $scope.addWeight = function(weight) {
    weight.$save().then(function(){

    }).catch(function(errors){
      //validations
    }).finally(function(){
      $scope.$emit('weightAdded');
      $scope.today();
    });
  };


  $scope.today = function() {
    $scope.newWeight.date = new Date();
  };
  $scope.today();

  $scope.clear = function() {
    $scope.newWeight.date = null;
  };

  $scope.dateOptions = {
    formatYear: 'yy',
    maxDate: new Date(2019, 1, 1),
    minDate: new Date('2016-08-12'),
    startingDay: 1,
    showWeeks: false
  };

  $scope.popup1 = {
    opened: false
  };
  $scope.open1 = function() {
    $scope.popup1.opened = true;
  };

  $scope.setDate = function(year, month, day) {
    $scope.newWeight.date = new Date(year, month, day);
  };

  $scope.format = 'dd/MM/yyyy';
  $scope.altInputFormats = ['M!/d!/yyyy'];



})
.directive('addWeight', function() {
  return {
    templateUrl: 'add-weight/add-weight.html'
  }
});
