angular.module('readyou.sidebar', [])
  .controller('TabCtrl', function TabCtrl() {
    this.settings = true;
    this.toggleTab = function (tabName) {
      this[tabName] = !this[tabName];
    };
  })

  .controller('EditorSettingsCtrl', ['$scope', 'editorOpts',
    function EditorSettingsCtrl($scope, editorOpts) {
      $scope.opts = editorOpts;
      $scope.sizes = [1, 2, 3, 4, 5, 6, 7, 8];

      $scope.$watchCollection('opts', function () {
        $scope.opts.set();
      });
    }
  ]);