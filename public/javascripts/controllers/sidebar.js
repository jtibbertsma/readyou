angular.module('readyou.sidebar', [])
  .controller('TabCtrl', function TabCtrl() {
    this.settings = true;
    this.toggleTab = function (tabName) {
      this[tabName] = !this[tabName];
    };
  })

  .controller('EditorSettingsCtrl', ['$scope',
    function EditorSettingsCtrl($scope) {
      $scope.opts = {line_wrap: true, tab_size: 2, soft_tabs: true};
      $scope.$watchCollection('opts', function () {
        console.log($scope.opts);
      });
    }
  ]);