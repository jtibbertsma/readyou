angular.module('readyou.resizable', [])
  .directive('resizableBoxes', ['optimizedResize', '$window', '$document',
    function resizableBoxesDirective(optimizedResize, $window, $document) {
      // Change OFFSET if we change the width of the sidebar, the middle
      // div, or the margins on .resizable-wrap. OFFSET is needed to calculate
      // the position of the draggable bar relative to its parent div. There's
      // probably a better way to do this.
      //
      // (217px; sidebar width) + (10px; .resizable-wrap left margin) +
      // (2px; border width) + (5px; half of middle bar width) = 234
      var OFFSET = 234;
      return {
        templateUrl: 'partials/resizable-boxes',
        link: function (scope, element, attrs) {
          var wrap = element.children()[0],
              left = angular.element(wrap.children[0]),
              middle = angular.element(wrap.children[1]),
              right = angular.element(wrap.children[2]),
              outerWidth, middlePos, mouseIsMoving = false;

          optimizedResize.add(resize);
          middle.on('mousedown', function () {
            $document.on('mousemove', mousemove);
            $document.on('mouseup', mouseup);
          });

          resize();

          /* mouse event callbacks */
          function mouseup() {
            $document.off('mousemove', mousemove);
            $document.off('mouseup', mouseup);
          }

          function mousemove(event) {
            event.preventDefault();
            if (!mouseIsMoving) {
              mouseIsMoving = true;
              $window.requestAnimationFrame(function () {
                middlePos = calcMiddlePosFromEvent(event);

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
            middlePos = calcMiddlePosFromCss() || Math.floor(outerWidth / 2) - 5;
          }

          /* Get the pixel offset of the middle div. We need to look at the
           * css value of the left attribute, and convert from percent value
           * to pixel value based on the value of outerWidth.
           */
          function calcMiddlePosFromCss() {
            if (middle.css('left') === '') return null;
            var percent = /(\d*(?:\.\d*)?)\%/.exec(middle.css('left'))[1];
            percent = parseFloat(percent) / 100;
            return outerWidth * percent;
          }

          /* Get the pixel offset of the middle div from the mouse event. Make sure
           * not to allow the draggable bar to be dragged to far to the right or
           * left.
           */
          function calcMiddlePosFromEvent(event) {
            var mid; 
            if (outerWidth > 350) {
              mid = event.screenX - OFFSET;
              mid = Math.max(mid, 175);
              mid = Math.min(mid, outerWidth - 175);
            } else {
              mid = Math.floor(outerWidth / 2) - 5;
            }
            return mid;
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