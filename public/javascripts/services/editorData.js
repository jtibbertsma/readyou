angular.module('readyou.ace', [])
  .factory('editorBuilder', ['$window', 'editorData', 'editorOpts', 'optimizedResize', '$timeout', 'initialText',
    function editorBuilderFactory($window, editorData, editorOpts, optimizedResize, $timeout, initialText) {
      function createEditor(element) {
        var Renderer = $window.ace.require('./virtual_renderer').VirtualRenderer,
            Editor = $window.ace.require('./editor').Editor;

        var session = $window.ace.createEditSession(initialText.text);
        session.setMode('ace/mode/markdown');

        // Putting this code in a timeout and creating the editor a little later
        // prevents a minor issue with the initial render when line wrap is on.
        $timeout(function () {
          var editor = new Editor(new Renderer(element));
          editor.setSession(session);
          editor.focus();

          optimizedResize.add(function () {
            editor.resize();
          });

          editorData.setMarkdownEditor(editor);
          editorOpts.set();

          $window.editor = editor;
        }, 5);
      }

      return {
        build: createEditor
      }
    }
  ])

  .factory('editorOpts', ['editorData',
    function editorOptsFactory(editorData) {
      var opts = {
        tabSize: 2,
        useSoftTabs: true,
        wrap: true
      };

      return {
        opts: opts,
        set: function () {
          if (editorData.markdownEditor) {
            editorData.markdownEditor.setOptions(opts);
          }
        }
      };
    }
  ])

  .factory('editorData', [
    function editorDataFactory() {
      return {
        markdownEditor: null,
        setMarkdownEditor: function (editor) {
          this.markdownEditor = editor;
        }
      }
    }
  ]);