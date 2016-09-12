angular.module('myApp').factory('SettingsService', function($resource){
  return $resource('/settings/:id', {id: '@id'}, {
    update: {
      method: "PUT"
    }
  });
});
