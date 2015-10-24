angular.module('readyou.renderer', [])
  .directive('markdownRenderer', ['$window', 'editorData',
    function markdownRendererDirective($window, editorData) {
      return {
        link: function (scope, element, attrs) {
          var mdDocument = null;

          scope.editorData = editorData;
          scope.$watch('editorData.markdownDocument', setDocument);

          function doRender() {
            element.html($window.marked(mdDocument.getAllLines().join('\n')));
          }

          function setDocument() {
            mdDocument = editorData.markdownDocument;
            if (mdDocument) {
              mdDocument.on('change', doRender);
              doRender();
            }
          }
        }
      };
    }
  ]);