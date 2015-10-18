angular.module('readyou.editor', [])
  .directive('markdownEditor', ['editorBuilder', 'editorData',
    function markdownEditorDirective(editorBuilder, editorData) {
      return {
        link: function (scope, element, attrs) {
          element.css('position', 'absolute');
          editorBuilder.build(element[0]);

          scope.$on('resizableBoxes:resize', function () {
            editorData.markdownEditor.resize();
            editorData.markdownEditor.focus();
          });
        }
      }
    }
  ]);