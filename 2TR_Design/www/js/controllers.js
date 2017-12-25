angular.module('app.controllers', ['LoginoutService'])

.controller('homeCtrl', ['$scope', '$stateParams', 'Cred', '$state', 'UserService',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,Cred, $state,UserService) {
$scope.name = function(){
 return Cred.getCred().name;
}
$scope.announcement = "Welcome to 2TR!";
$scope.session1 = "No upcoming sessions."
UserService.init();
$scope.AddSession = function(){
    if (Cred.getCred().login ===false){
        alert("Please Log in First!");
        $state.go("login");
    }else{
        // Loged in
        $state.go("menu.pickASubject");
}
}

$scope.ViewSessions = function(){
    if (Cred.getCred().login === false){
        alert("Please Log in First!");
        $state.go("login");
    } else{
        $state.go("menu.status");


    }
}


}])

.controller('menuCtrl', ['$scope', '$stateParams', '$state', 'Cred','UserService', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$state,Cred,UserService) {

UserService.init();
// $scope init
$scope.cred = function(){
  return Cred.getCred();
}

if ($scope.cred().login === false){
$scope.name = "Guest";
$scope.grade = "";
$scope.ShowUser = true;
$scope.ShowTutor = false;
}else{
    $scope.name = $scope.cred().name;
    $scope.grade = $scope.cred().grade;
    $scope.ShowUser = $scope.cred().User;
    $scope.ShowTutor = $scope.cred().Tutor;
}

$scope.login = $scope.cred().login;


$scope.AddSession = function(){
    if (Cred.getCred().login ===false){
        alert("Please Log in First!");
        $state.go("login");
    }else{
        // Loged in
        $state.go("menu.pickASubject");


    }
}
$scope.ViewSessions = function(){
    if (Cred.getCred().login === false){
        alert("Please Log in First");
        $state.go("login");
    } else{
        $state.go("menu.status");


    }
}


$scope.Logout = function(){
    UserService.logout();
    Cred.reset();
    $state.go("login");
}

}])

.controller('welcomeToJoin2TRCtrl', ['$scope', '$stateParams', 'UserService','$state','Cred',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,UserService,$state,Cred) {
$scope.cred = {
  ViewUser : false,
  ViewTutor : false,
  email:"",
  password:"",
  name:"",
  grade:""
};
UserService.init();
$scope.registerPass = false;
$scope.check = function(){

  if (($scope.cred.email=="") ){alert("Please Use the right Email Address!");}
  else if ($scope.cred.name =="") {alert("Please Enter Your Full name.");}
  else if($scope.cred.password == ""){alert("Please Enter Your Password.")}
  else if($scope.cred.grade==""){alert("Please Select Your Grade.");}
  else{
    $scope.registerPass = true;
  }
}


$scope.TutorSignup = function(){
  $scope.check();
  if ($scope.registerPass){
UserService.createUser($scope.cred.email,$scope.cred.ViewTutor,$scope.cred.ViewUser,$scope.cred.password,$scope.cred.name,$scope.cred.grade).then(function(_response) {
  console.log("created user", _response);
  alert("login success " + _response.name || _response.username);
  creden = {};
  creden.name = _response.name;
  creden.email = _response.username;
  creden.Tutor = _response.tutor;
  creden.User = _response.user;
  creden.grade = _response.grade;
  creden.login = true;
  Cred.setCred(creden);
  $state.go('menu.signUpForTutor');
}, function(_error) {
  console.log(_error);
  alert("error logging in " + _error.description);
});
}
};

$scope.UserSignup = function(){
$scope.check();
if ($scope.registerPass){
    UserService.createUser($scope.cred.email,$scope.cred.ViewTutor,$scope.cred.ViewUser,$scope.cred.password,$scope.cred.name,$scope.cred.grade).then(function(_response) {
    console.log("created user", _response);
    alert("login success " + _response.name || _response.username);
    cred = {};
    creden = {};
    creden.name = _response.name;
    creden.email = _response.username;
    creden.Tutor = _response.tutor;
    creden.User = _response.user;
    creden.grade = _response.grade;
    creden.login = true;
    Cred.setCred(creden);
    $state.go('menu.home');
  }, function(_error) {
    console.log(_error);
    alert("error logging in " + _error.description);
  });
}
  };


}])

.controller('loginCtrl', ['$scope', '$stateParams','$state' , 'Cred', 'UserService', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$state,Cred,UserService) {
UserService.init();

$scope.creds = {
      username: "",
      password: ""
    };
$scope.login = function() {
  UserService.init();
  UserService.login($scope.creds.username, $scope.creds.password)
    .then(function(_response) {

      alert("login success " + _response.name);
      cred = {};
      cred.name = _response.name;
      cred.email = _response.username;
      cred.Tutor = _response.tutor;
      cred.User = _response.user;
      cred.grade = _response.grade;
      cred.login = true;
      Cred.setCred(cred);
      // transition to next state
      $state.go("menu.home" ,{}, {reload: true});

    }, function(_error) {
      alert("error logging in " + _error.description);
    }
)};

$scope.signup = function(){
  $state.go('welcomeToJoin2TR');
};


}])

.controller('pickASubjectCtrl', ['$scope', '$stateParams', '$state', 'Requests','UserService',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName


function ($scope, $stateParams, $state , Requests,UserService) {
UserService.init();
$scope.mathbutton = function(){
 r = {};
  r.subject = "math";
   r.subsubject = "";
  Requests.setRequest(r);
   $state.go("menu.completeTheRequestForm");
};

$scope.humanitybutton = function(){
    r = {};
    r.subject = "humanity";
    r.subsubject = "";
    Requests.setRequest(r);
    $state.go("menu.completeTheRequestForm");
};
$scope.literaturebutton = function(){
    r = {};
    r.subject = "literature";
    r.subsubject = "";
    Requests.setRequest(r);
  $state.go("menu.completeTheRequestForm");
};
$scope.sciencebutton = function(){
    r = {};
    r.subject = "science";
    r.subsubject = "";
    Requests.setRequest(r);
    $state.go("menu.completeTheRequestForm");
};


}])

.controller('signUpForTutorCtrl', ['$scope', '$stateParams','UserService', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,UserService) {
UserService.init();

}])

.controller('findYourTutorCtrl', ['$scope', '$stateParams','UserService', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,UserService) {
UserService.init();

}])

.controller('statusCtrl', ['$scope', '$stateParams','UserService', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,UserService) {
UserService.init();

}])

.controller('sessionDetailCtrl', ['$scope', '$stateParams','UserService', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,UserService) {
UserService.init();

}])

.controller('profileSettingCtrl', ['$scope', '$stateParams','UserService', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,UserService) {
UserService.init();

}])

.controller('completeTheRequestFormCtrl', ['$scope', '$stateParams', '$state','Requests' ,'UserService', '$cordovaCamera',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$state,Requests,UserService, $cordovaCamera) {
  UserService.init();
$scope.subject = function(){
  return Requests.getRequest().subject;
};$scope.takePicture = function() {
        var options = {
            quality : 75,
            destinationType : Camera.DestinationType.DATA_URL,
            sourceType : Camera.PictureSourceType.CAMERA,
            allowEdit : true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 300,
            targetHeight: 300,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false
        };

        $cordovaCamera.getPicture(options).then(function(imageData) {
            $scope.imgURI = "data:image/jpeg;base64," + imageData;
        }, function(err) {
            // An error occured. Show a message to the user
        });
    }


$scope.findTutor = function(){
    $state.go("menu.findYourTutor");
}

}])
