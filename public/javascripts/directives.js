angular.module('ReadyouDirectives', [])
  .directive('resizableBoxes', [
    function resizableBoxesDirective() {
      return {
        templateUrl: 'partials/resizable-boxes'
      };
    }
  ]);