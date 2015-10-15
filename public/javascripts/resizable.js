angular.module('readyou.resizable', [])
  .directive('resizableBoxes', ['optimizedResize', '$window', '$document',
    function resizableBoxesDirective(optimizedResize, $window, $document) {
      // Change OFFSET if we change the width of the sidebar, the dragBar,
      // or the margins on .resizable-wrap. OFFSET is needed to calculate
      // the position of the draggable bar relative to its parent div. There's
      // probably a better way to do this.
      //
      // (217px; sidebar width) + (10px; .resizable-wrap left margin) +
      // (2px; border width) + (5px; half of dragBar bar width) = 234
      var OFFSET = 234;
      return {
        templateUrl: 'partials/resizable-boxes',
        link: function (scope, element, attrs) {
          var wrap = element.children()[0],
              left = angular.element(wrap.children[0]),
              dragBar = angular.element(wrap.children[1]),
              right = angular.element(wrap.children[2]),
              outerWidth, dragBarPos, mouseIsMoving = false;

          optimizedResize.add(resize);
          dragBar.on('mousedown', function () {
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
                dragBarPos = calcDragBarPosFromEvent(event);

                setDragBarLeft();
                setBoxWidths();

                mouseIsMoving = false;
              });
            }
          }

          /* Set the outerWidth and dragBarPos variables; used on initialization
           * and window resize
           */
          function setOuterWidth() {
            outerWidth = wrap.offsetWidth;
            dragBarPos = calcDragBarPosFromCss() || Math.floor(outerWidth / 2) - 5;
          }

          /* Get the pixel offset of the dragBar. We need to look at the
           * css value of the left attribute, and convert from percent value
           * to pixel value based on the value of outerWidth.
           */
          function calcDragBarPosFromCss() {
            if (dragBar.css('left') === '') return null;
            var percent = /(\d*(?:\.\d*)?)\%/.exec(dragBar.css('left'))[1];
            percent = parseFloat(percent) / 100;
            return outerWidth * percent;
          }

          /* Get the pixel offset of the dragBar from the mouse event. Make sure
           * not to allow the draggable bar to be dragged to far to the right or
           * left.
           */
          function calcDragBarPosFromEvent(event) {
            var mid; 
            if (outerWidth > 200) {
              mid = event.screenX - OFFSET;
              mid = Math.max(mid, 100);
              mid = Math.min(mid, outerWidth - 100);
            } else {
              mid = Math.floor(outerWidth / 2) - 5;
            }
            return mid;
          }

          /* Figure out the widths of each box based on the position of the dragBar.
           */
          function setBoxWidths() {
            var leftWidth = dragBarPos - 2,
                rightWidth = outerWidth - dragBarPos - 12;

            left.css('width', '' + toPercent(leftWidth) + '%');
            right.css('width', '' + toPercent(rightWidth) + '%');
          }

          /* Calculate percent value from pixel value and outerWidth.
           */
          function toPercent(pixels) {
            return pixels / outerWidth * 100;
          }

          /* Sets the left value of the dragBar based on the dragBarPos
           * variable.
           */
          function setDragBarLeft() {
            dragBar.css('left', '' + toPercent(dragBarPos) + '%');
          }

          /* window resize callback */
          function resize() {
            setOuterWidth();
            setDragBarLeft();
            setBoxWidths();
          }
        }
      };
    }
  ]);