angular.module('readyou.events', [])
  .factory('optimizedResize', ['$window',
    // throttled resize event, taken from
    // https://developer.mozilla.org/en-US/docs/Web/Events/resize#requestAnimationFrame
    function optimizedResizeFactory($window) {
      var callbacks = [],
          running = false;

      // fired on resize event
      function resize() {
        if (!running) {
          running = true;
          $window.requestAnimationFrame(runCallbacks);
        }
      }

      // run the actual callbacks
      function runCallbacks() {
        callbacks.forEach(function(callback) {
          callback();
        });

        running = false;
      }

      // adds callback to loop
      function addCallback(callback) {
        if (callback) {
          callbacks.push(callback);
        }
      }

      return {
        // public method to add additional callback
        add: function(callback) {
          if (!callbacks.length) {
            $window.addEventListener('resize', resize);
          }
          addCallback(callback);
        }
      }
    }
  ]);