angular.module('ReadyouDirectives', [])
  .directive('resizableBoxes', [
    function resizableBoxesDirective() {
      return {
        templateUrl: 'partials/resizable-boxes',
        link: function (scope, element, attrs) {
          var children = element.children(),
              left = angular.element(children[0]),
              middle = angular.element(children[1]),
              right = angular.element(children[2]),
              totalWidth = element[0].offsetWidth,
              middlePos = Math.floor(totalWidth / 2) - 5;

          middle.css('left', '' + middlePos + 'px');
          resize();

          function resize() {
            var leftWidth = middlePos - 12,
                rightWidth = totalWidth - middlePos - 22;

            left.css('width', '' + leftWidth + 'px');
            right.css('width', '' + rightWidth + 'px');
          }
        }
      };
    }
  ]);