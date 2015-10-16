angular.module('readyou.ace', [])
  .factory('aceLib', ['$window', 'editSession', 'optimizedResize',
    function aceLibFactory($window, editSession, optimizedResize) {
      function createEditor(element) {
        var Renderer = $window.ace.require('./virtual_renderer').VirtualRenderer,
            Editor = $window.ace.require('./editor').Editor;

        var editor = new Editor(new Renderer(element));
        editor.setSession(editSession.session);

        optimizedResize.add(function () {
          editor.resize();
        });

        editor.focus();
        return editor;
      }

      return {
        createEditor: createEditor
      }
    }
  ])

  .factory('editSession', ['$window',
    function editSessionFactory($window) {
      var session = $window.ace.createEditSession('');
      session.setMode('ace/mode/markdown');

      return {
        session: session
      }
    }
  ]);