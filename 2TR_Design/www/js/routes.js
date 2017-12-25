angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('menu.home', {
    url: '/page1',
    views: {
      'side-menu21': {
        templateUrl: 'templates/home.html',
        controller: 'homeCtrl'
      }
    }
  })

  .state('menu', {
    url: '/side-menu21',
    templateUrl: 'templates/menu.html',
    controller: 'menuCtrl'
  })

  .state('welcomeToJoin2TR', {
    url: '/page12',
    templateUrl: 'templates/welcomeToJoin2TR.html',
    controller: 'welcomeToJoin2TRCtrl'
  })

  .state('login', {
    url: '/page5',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

  .state('menu.pickASubject', {
    url: '/page6',
    views: {
      'side-menu21': {
        templateUrl: 'templates/pickASubject.html',
        controller: 'pickASubjectCtrl'
      }
    }
  })

  .state('menu.signUpForTutor', {
    url: '/page7',
    views: {
      'side-menu21': {
        templateUrl: 'templates/signUpForTutor.html',
        controller: 'signUpForTutorCtrl'
      }
    }
  })

  .state('menu.findYourTutor', {
    url: '/page8',
    views: {
      'side-menu21': {
        templateUrl: 'templates/findYourTutor.html',
        controller: 'findYourTutorCtrl'
      }
    }
  })

  .state('menu.status', {
    url: '/page9',
    views: {
      'side-menu21': {
        templateUrl: 'templates/status.html',
        controller: 'statusCtrl'
      }
    }
  })

  .state('sessionDetail', {
    url: '/page10',
    templateUrl: 'templates/sessionDetail.html',
    controller: 'sessionDetailCtrl'
  })

  .state('menu.profileSetting', {
    url: '/page13',
    views: {
      'side-menu21': {
        templateUrl: 'templates/profileSetting.html',
        controller: 'profileSettingCtrl'
      }
    }
  })

  .state('menu.completeTheRequestForm', {
    url: '/page14',
    views: {
      'side-menu21': {
        templateUrl: 'templates/completeTheRequestForm.html',
        controller: 'completeTheRequestFormCtrl'
      }
    }
  })

$urlRouterProvider.otherwise('/side-menu21/page1')

  

});