angular.module('readyou.editor', [])
  .directive('markdownEditor', ['editorBuilder',
    function markdownEditorDirective(editorBuilder) {
      return {
        link: function (scope, element, attrs) {
          element.css('position', 'absolute');
          var editor = editorBuilder.build(element[0]);

          scope.$on('resizableBoxes:resize', function () {
            editor.resize();
            editor.focus();
          });
        }
      }
    }
  ]);