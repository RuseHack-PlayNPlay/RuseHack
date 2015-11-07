/**
 * Created by leozhekov on 11/7/15.
 */
var directives = angular.module("directives", []);

directives.directive('errSrc', function() {
  return {
    link: function(scope, element, attrs) {
      element.bind('error', function() {
        if (attrs.src != attrs.errSrc) {
          attrs.$set('src', attrs.errSrc);
        }
      });
    }
  }
});