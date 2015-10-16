angular.module('readyou.editor', [])
  .directive('markdownEditor', ['aceLib',
    function markdownEditorDirective(aceLib) {
      return {
        link: function (scope, element, attrs) {
          element.css('position', 'absolute');
          var editor = aceLib.createEditor(element[0]);

          scope.$on('resizableBoxes:resize', function () {
            editor.resize();
            editor.focus();
          });
        }
      }
    }
  ]);