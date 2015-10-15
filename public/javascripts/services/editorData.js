angular.module('readyou.ace', [])
  .factory('aceLib', ['$window', '$timeout',
    function aceLibFactory($window, $timeout) {
      return {
        createEditor: function (editorId) {
          var editor = $window.ace.edit(editorId);
          editor.getSession().setMode("ace/mode/markdown");
          editor.focus();
          return editor;
        }
      }
    }
  ]);