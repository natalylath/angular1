angular.module('myApp').factory('WeightItem', function($resource){
  return $resource('/dashboard/:weightId', {weightId: '@id'}, {
    update: {
      method: "PUT"
    }
  });
});
