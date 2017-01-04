// Preload firebase dataset
//TODO: Move this to services - and load from localstorage if already saved
/*var fb = new Firebase('https://uwibootcamp.firebaseio.com/');
fb.set(
  {
    "points": [
    {
        id:1,
        title: "Grape of Wrath",
        latitude: 13.105849,
        longitude: -59.5815219
    },
    {
        id:2,
        title: "Wind Through the Keyhole",
        latitude: 13.1337264,
        longitude: -59.5594634
    },
    {
        id:3,
        title: "Art of Racing in the Rain",
        latitude: 13.1091092,
        longitude: -59.4897689
    }
  ]
});*/

var fb = new Firebase("https://uwibootcamp-test.firebaseio.com")


// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngCordova','firebase', 'LocalStorageModule'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, localStorageServiceProvider) {

  localStorageServiceProvider.setPrefix('bootcamp');

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.map', {
    url: '/map',
    views: {
      'tab-map': {
        templateUrl: 'templates/tab-map.html',
        controller: 'MapCtrl'
      }
    }
  })

  .state('tab.points', {
      url: '/points',
      views: {
        'tab-points': {
          templateUrl: 'templates/tab-points.html',
          controller: 'PointsCtrl'
        }
      }
    })
    .state('tab.point-info', {
      url: '/points/:pointId',
      views: {
        'tab-points': {
          templateUrl: 'templates/point-info.html',
          controller: 'PointInfoCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/map');

});
