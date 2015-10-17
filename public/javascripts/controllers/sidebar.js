angular.module('readyou.sidebar', [])
  .controller('TabCtrl', function TabCtrl() {
    this.settings = true;
    this.toggleTab = function (tabName) {
      this[tabName] = !this[tabName];
    };
  })

  .controller('EditorSettingsCtrl', ['$scope',
    function EditorSettingsCtrl($scope) {
      $scope.opts = {wrap: true, tabSize: 2, useSoftTabs: true};
      $scope.sizes = [1, 2, 3, 4, 5, 6, 7, 8];

      $scope.$watchCollection('opts', function () {
        console.log($scope.opts);
      });
    }
  ]);