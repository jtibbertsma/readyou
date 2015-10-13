angular.module('ReadyouDirectives', [])
  .directive('resizableBoxes', [
    function resizableBoxesDirective() {
      return {
        templateUrl: 'partials/resizable-boxes',
        link: function (scope, element, attrs) {
          var wrap = element.children()[0],
              left = angular.element(wrap.children[0]),
              middle = angular.element(wrap.children[1]),
              right = angular.element(wrap.children[2]),
              outerWidth, middlePos;

          setOuterWidth();
          middle.css('left', '' + toPercent(middlePos) + '%');
          setBoxWidths();

          function setOuterWidth() {
            outerWidth = wrap.offsetWidth;
            middlePos = calcMiddlePos() || Math.floor(outerWidth / 2) - 5;
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
            var leftWidth = middlePos - 2,
                rightWidth = outerWidth - middlePos - 12;

            left.css('width', '' + toPercent(leftWidth) + '%');
            right.css('width', '' + toPercent(rightWidth) + '%');
          }

          /* Calculate percent value from pixel value and outerWidth.
           */
          function toPercent(pixels) {
            return pixels / outerWidth * 100;
          }
        }
      };
    }
  ]);