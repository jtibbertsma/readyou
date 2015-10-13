angular.module('ReadyouDirectives', [])
  .directive('resizableBoxes', [
    function resizableBoxesDirective() {
      return {
        templateUrl: 'partials/resizable-boxes',
        link: function (scope, element, attrs) {
          var left = angular.element(element.children()[0]),
              middle = angular.element(element.children()[1]),
              right = angular.element(element.children()[2]);
              outerWidth, middlePos;

          setOuterWidth();
          middle.css('left', '' + calcPercent(middlePos) + '%');
          setBoxWidths();

          function setOuterWidth() {
            outerWidth = element[0].offsetWidth;
            middlePos = caclMiddlePos() || Math.floor(outerWidth / 2) - 5;
          }

          /* Get the pixel offset of the middle div. We need to look at the
           * css value of the left attribute, and convert from percent value
           * to pixel value based on the value of outerWidth.
           */
          function calcMiddlePos() {
            if (middle.css('left') === '') return null;
            var percent = /(\d*(?:\.\d*)?)\%/.exec(middle.css('left'))[1];
            percent = parseFloat(percent) / 100;
            return outerWidth * percent;
          }

          /* Figure out the widths of each box based on the position of the middle div.
           */
          function setBoxWidths() {
            var leftWidth = middlePos - 10;
          }
        }
      };
    }
  ]);