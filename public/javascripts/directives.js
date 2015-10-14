angular.module('ReadyouDirectives', [])
  .directive('resizableBoxes', ['optimizedResize', '$window', '$document',
    function resizableBoxesDirective(optimizedResize, $window, $document) {
      return {
        templateUrl: 'partials/resizable-boxes',
        link: function (scope, element, attrs) {
          var wrap = element.children()[0],
              left = angular.element(wrap.children[0]),
              middle = angular.element(wrap.children[1]),
              right = angular.element(wrap.children[2]),
              outerWidth, middlePos, mouseIsMoving = false,
              mouseIsDown = false;

          optimizedResize.add(resize);
          middle.on('mousedown', function () {
            $document.on('mousemove', mousemove);
            $document.on('mouseup', mouseup);
          });

          resize();

          /* mouse action callbacks */
          function mouseup() {
            $document.off('mousemove', mousemove);
            $document.off('mouseup', mouseup);
          }

          function mousemove(event) {
            event.preventDefault();
            if (!mouseIsMoving) {
              mouseIsMoving = true;
              $window.requestAnimationFrame(function () {
                middlePos += event.offsetX - 5;
                console.log(event.offsetX);
                setMiddleLeft();
                setBoxWidths();

                mouseIsMoving = false;
              });
            }
          }

          /* Set the outerWidth and middlePos variables; used on initialization
           * and window resize
           */
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

          /* Sets the left value of the middle div based on the middlePos
           * variable.
           */
          function setMiddleLeft() {
            middle.css('left', '' + toPercent(middlePos) + '%');
          }

          /* window resize callback */
          function resize() {
            setOuterWidth();
            setMiddleLeft();
            setBoxWidths();
          }
        }
      };
    }
  ]);