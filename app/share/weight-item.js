angular.module('myApp').factory('WeightItem', function($resource){
  return $resource('/dashboard');
});
