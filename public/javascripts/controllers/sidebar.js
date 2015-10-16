angular.module('readyou.sidebar', [])
  .controller('TabCtrl', function TabCtrl() {
    this.toggleTab = function (tabName) {
      this[tabName] = !this[tabName];
    };
  });