angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('tabsController.dashboard', {
    url: '/page2',
    views: {
      'tab1': {
        templateUrl: 'templates/dashboard.html',
        controller: 'dashboardCtrl'
      }
    }
  })

  .state('tabsController.class', {
    url: '/page3',
    views: {
      'tab2': {
        templateUrl: 'templates/class.html',
        controller: 'classCtrl'
      }
    }
  })

  .state('tabsController.tutor', {
    url: '/page4',
    views: {
      'tab3': {
        templateUrl: 'templates/tutor.html',
        controller: 'tutorCtrl'
      }
    }
  })

  .state('tabsController', {
    url: '/page1',
    templateUrl: 'templates/tabsController.html',
    abstract:true
  })

  .state('tabsController.tutorSetting', {
    url: '/page5',
	params: {
		tutor: "",
		id: ""		
},
    views: {
      'tab3': {
        templateUrl: 'templates/tutorSetting.html',
        controller: 'tutorSettingCtrl'
      }
    }
  })

$urlRouterProvider.otherwise('/page1/page2')

  

});