'use strict';

angular.module('myApp.settings', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/settings', {
    templateUrl: 'settings/settings.html',
    controller: 'SettingsController'
  });
}])

.controller('SettingsController', function($scope, SettingsService) {

  // if there are settings, then show just text, not form
  $scope.savedSettings = SettingsService.query({}, function(response) {
    if (response[0]) {
      $scope.dateIsSet = true;
    }
  });


  $scope.mySettings = new SettingsService();

  $scope.dateIsSet = false;

  $scope.today = function() {
    $scope.mySettings.dueDate = new Date();
  };
  $scope.today();

  $scope.clear = function() {
    $scope.mySettings.dueDate = null;
  };

  var todayDate = new Date();
  todayDate.setDate(todayDate.getDate() + 290); //add 9 months to today date to get maximum date in calendar

  $scope.dateOptions = {
    formatYear: 'yy',
    maxDate: todayDate,
    minDate: new Date(),
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
    $scope.mySettings.dueDate = new Date(year, month, day);
  };

  $scope.format = 'dd/MM/yyyy';
  $scope.altInputFormats = ['M!/d!/yyyy'];




  $scope.setDueDate = function(settings) {

    var oneDay = 24*60*60*1000;

    $scope.diffDays = Math.round(Math.abs(($scope.mySettings.dueDate.getTime() - new Date().getTime())/(oneDay)));
    $scope.mySettings.diffWeeks = Math.round($scope.diffDays/7);
    $scope.mySettings.diffPartWeek = Math.abs($scope.diffDays - $scope.mySettings.diffWeeks*7);

    $scope.dateIsSet = true;


    // why after $save mySettings object is undefined???
    settings.$save().then(function(){

    }).catch(function(errors){
      //validations
    }).finally(function(){
      $scope.savedSettings = SettingsService.query();
    });

  };

  $scope.updateSettings = function() {
    
  };





});
