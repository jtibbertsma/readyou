angular.module('readyou.editor', [])
  .directive('markdownEditor', ['aceLib',
    function markdownEditorDirective(aceLib) {
      return {
        link: function (scope, element, attrs) {
          element.css('position', 'absolute');
          var editor = aceLib.createEditor(attrs.id);
        }
      }
    }
  ]);