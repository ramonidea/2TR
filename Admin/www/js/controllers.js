angular.module('app.controllers', [])
  
.controller('dashboardCtrl', ['$http', '$scope', '$stateParams', '$kinvey', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($http,$scope, $stateParams,$kinvey) {
     var authString = "Basic " + "a2lkX3IxTE5aTUdTeDo3OTI4MWI3MGEzYzI0ZTI5YWU0MWJkNzBlNjE2Mzk2ZQ==";
    
    $scope.info = {};
    
    $http({
        method : "GET",
        url : 'https://baas.kinvey.com/user/kid_r1LNZMGSx/?query={"user":true}',
        headers:{
            "Authorization":authString
        }
    }).then(function mySucces(response) {
       $scope.info.user = response.data.length;
       console.log(response.data);
    }, function myError(response) {
        console.log(response);
        $scope.info.user ="N/A";
    });
    
    $http({
        method : "GET",
        url : 'https://baas.kinvey.com/user/kid_r1LNZMGSx/?query={"tutor":true}',
        headers:{
            "Authorization":authString
        }
    }).then(function mySucces(response) {
       console.log(response.data);
       $scope.info.tutor = response.data.length;
    }, function myError(response) {
        console.log(response);
        $scope.info.tutor ="N/A";
    });
    
    $http({
        method : "GET",
        url : 'https://baas.kinvey.com/appdata/kid_r1LNZMGSx/TutorService/?query={"subject":"Math"}',
        headers:{
            "Authorization":authString
        }
    }).then(function mySucces(response) {
       console.log(response.data);
       $scope.info.tutor_m = response.data.length;
    }, function myError(response) {
        console.log(response);
        $scope.info.tutor_m ="N/A";
    });
      $http({
        method : "GET",
        url : 'https://baas.kinvey.com/appdata/kid_r1LNZMGSx/TutorService/?query={"subject":"Literature"}',
        headers:{
            "Authorization":authString
        }
    }).then(function mySucces(response) {
       console.log(response.data);
       $scope.info.tutor_l = response.data.length;
    }, function myError(response) {
        console.log(response);
        $scope.info.tutor_l ="N/A";
    });
      $http({
        method : "GET",
        url : 'https://baas.kinvey.com/appdata/kid_r1LNZMGSx/TutorService/?query={"subject":"Science"}',
        headers:{
            "Authorization":authString
        }
    }).then(function mySucces(response) {
       console.log(response.data);
       $scope.info.tutor_s = response.data.length;
    }, function myError(response) {
        console.log(response);
        $scope.info.tutor_s ="N/A";
    });
      $http({
        method : "GET",
        url : 'https://baas.kinvey.com/appdata/kid_r1LNZMGSx/TutorService/?query={"subject":"Humanity"}',
        headers:{
            "Authorization":authString
        }
    }).then(function mySucces(response) {
       console.log(response.data);
       $scope.info.tutor_ss = response.data.length;
    }, function myError(response) {
        console.log(response);
        $scope.info.tutor_ss ="N/A";
    });
      $http({
        method : "GET",
        url : 'https://baas.kinvey.com/appdata/kid_r1LNZMGSx/TutorService/?query={"subject":"Language"}',
        headers:{
            "Authorization":authString
        }
    }).then(function mySucces(response) {
       console.log(response.data);
       $scope.info.tutor_lan = response.data.length;
    }, function myError(response) {
        console.log(response);
        $scope.info.tutor_lan ="N/A";
    });
      $http({
        method : "GET",
        url : 'https://baas.kinvey.com/appdata/kid_r1LNZMGSx/TutorService/?query={"subject":"Other"}',
        headers:{
            "Authorization":authString
        }
    }).then(function mySucces(response) {
       console.log(response.data);
       $scope.info.tutor_o = response.data.length;
    }, function myError(response) {
        console.log(response);
        $scope.info.tutor_o ="N/A";
    });
    
    /*
    var time=new Date(Date.now());
    console.log(time.getFullYear()+"-"+time.getMonth()+1+"-"+time.getDate());
    
    */
   


}])
   
.controller('classCtrl', ['$ionicPopup', '$http', '$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($ionicPopup,$http,$scope, $stateParams) {
    
    $scope.info={};
    $scope.info.subject={};
    $scope.info.id = {};
    
    var authString = "Basic " + "a2lkX3IxTE5aTUdTeDo3OTI4MWI3MGEzYzI0ZTI5YWU0MWJkNzBlNjE2Mzk2ZQ==";
 $scope.fetch = function(_subject){
        $http({
        method : "GET",
        url : 'https://baas.kinvey.com/appdata/kid_r1LNZMGSx/BackService/?query={"Subject":"'+_subject+'"}',
        headers:{
            "Authorization":authString
        }
    }).then(function mySucces(response) {
    
        console.log(response.data[0].Service.split(','));
        $scope.info.id[_subject] = response.data[0]._id;
        $scope.info.subject[_subject] = response.data[0].Service;
        $scope.info[_subject] = response.data[0].Service.split(',');
    }, function myError(response) {
        console.log(response);
    });
    }
    function f(){
    $scope.fetch("Math");
    $scope.fetch("Literature");
    $scope.fetch("Science");
    $scope.fetch("Humanity");
    $scope.fetch("Language");
    console.log($scope.info);
    }
    
    f();
    
    
    $scope.showPopup = function(_subject) {
  $scope.data = {};

  // An elaborate, custom popup
  var myPopup = $ionicPopup.show({
    template: '<input type="New Service" ng-model="data.service">',
    title: 'Enter New Service Name',
    subTitle: '',
    scope: $scope,
    buttons: [
      { text: 'Cancel' },
      {
        text: '<b>Save</b>',
        type: 'button-positive',
        onTap: function(e) {
          $scope.info.subject[_subject]+=","+$scope.data.service;
          
           $http({
        method : "PUT",
        url : 'https://baas.kinvey.com/appdata/kid_r1LNZMGSx/BackService/'+$scope.info.id[_subject],
        headers:{
            "Authorization":authString,
            "Content-Type": "application/json"
        },
        data:{
            "Subject":_subject,
            "Service": $scope.info.subject[_subject],
        }
    }).then(function mySucces(response) {
        console.log(response);
    
    }, function myError(response) {
        console.log(response);
    });
    
          
          
        }
      }
    ]
  });

  myPopup.then(function(res) {
    console.log('Tapped!', res);
    f();
  });

 };
    
    
    
    
    
    
    
}])
   
.controller('tutorCtrl', ['$http', '$scope', '$stateParams', '$state', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($http,$scope, $stateParams,$state) {
     var authString = "Basic " + "a2lkX3IxTE5aTUdTeDo3OTI4MWI3MGEzYzI0ZTI5YWU0MWJkNzBlNjE2Mzk2ZQ==";
    $scope.tutor =[];
    $scope.info={};
    $scope.info.keys = [];
    
    
    $http({
        method : "GET",
        url : 'https://baas.kinvey.com/appdata/kid_r1LNZMGSx/TutorService/?query={}',
        headers:{
            "Authorization":authString
        }
    }).then(function mySucces(response) {
       console.log(response.data);
       $scope.info.tutor = response.data;
       console.log($scope.info.tutor);
    for(i=0;i<$scope.info.tutor.length;i++){
        if($scope.info.keys.indexOf($scope.info.tutor[i].Email)==-1){
            $scope.info.keys.push($scope.info.tutor[i].Email);
        $scope.tutor.push({
            "data":$scope.info.tutor[i],
            "name":$scope.info.tutor[i].Email
        });
        }
    }
        
        
    }, function myError(response) {
        console.log(response);
        $scope.info.tutor ="N/A";
    });
    
    $scope.update = function(t){
        $scope.info.index = t;
        $scope.info.tutor_i = $scope.tutor[t].data.tutor_email;
        $scope.info.tutor_d = $scope.tutor[t].data.tutorid;
        
    }
    
    

}])
      
.controller('tutorSettingCtrl', ['$http', '$scope', '$stateParams', 'filterFilter', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($http,$scope, $stateParams,filterFilter) {
    var authString = "Basic " + "a2lkX3IxTE5aTUdTeDo3OTI4MWI3MGEzYzI0ZTI5YWU0MWJkNzBlNjE2Mzk2ZQ==";
    $scope.tutor = {};
    $scope.tutor.email = $stateParams.tutor;
    $scope.tutor.id = $stateParams.id;
    $scope.tutor.error = "No";
    $scope.Service = "";
    $scope.tutor.button = false;
    $scope.info = {};
    $scope.selection = []
    
    $scope.toggleSelection = function toggleSelection(fruitName) {
    var idx = $scope.selection.indexOf(fruitName);

    // Is currently selected
    if (idx > -1) {
      $scope.selection.splice(idx, 1);
    }

    // Is newly selected
    else {
      $scope.selection.push(fruitName);
    }
  };


    $scope.check = function(_subject){
        $scope.tutor.button = false;
    $http({
        method : "GET",
        url : 'https://baas.kinvey.com/appdata/kid_r1LNZMGSx/TutorService/?query={"$and":[{"tutor_email":"'+String($scope.tutor.email)+'","subject":"'+_subject+'"}]}',
        headers:{
            "Authorization":authString
        }
    }).then(function mySucces(response) {
        console.log(response);
        if(response.data.length>0){
            $scope.tutor.ava = response.data[0].Status;
        $scope.tutor.error = "";
        $scope.tutor.id = response.data[0]._id
        $scope.tutor.name =$scope.tutor.email;
        $scope.tutor.subject = response.data[0].subject;
        $scope.tutor.credentials = response.data[0].credentials;
        $scope.selection = response.data[0].subsubjects;
        $scope.fetch(_subject);
        $scope.info = response.data[0];
        console.log($scope.info);
        console.log($scope.selection);
        
        }else{
            $scope.tutor.error = "Not This Subject."
        }
    }, function myError(response) {
        console.log(response);
    });

}

    $scope.fetch = function(_subject){
        $http({
        method : "GET",
        url : 'https://baas.kinvey.com/appdata/kid_r1LNZMGSx/BackService/?query={"Subject":"'+_subject+'"}',
        headers:{
            "Authorization":authString
        }
    }).then(function mySucces(response) {
    
        console.log(response.data[0].Service.split(','));
          $scope.tutor.Service = response.data[0].Service.split(',');
        
        console.log(response.data[0].Service.split(','));
    }, function myError(response) {
        console.log(response);
    });
    }
    
    $scope.save = function(){
        $scope.tutor.button = true;
        $scope.info.Service = $scope.selection;
        console.log($scope.info);
        
         $http({
        method : "PUT",
        url : 'https://baas.kinvey.com/appdata/kid_r1LNZMGSx/TutorService/'+$scope.tutor.id,
        headers:{
            "Authorization":authString,
            "Content-Type": "application/json"
        },
        data:{
            "grade": $scope.info.grade,
  "subject": $scope.info.subject,
  "subsubjects": $scope.selection,
  "Status": "Available",
  "Email": $scope.info.Email,
  "credentials": $scope.info.credentials,
  "IsOpen": $scope.info.IsOpen,
  "tutor_email": $scope.info.tutor_email,
  "profile": $scope.info.profile,
  "periods": $scope.info.periods,
  "tutorid":$scope.info.tutorid
        }
    }).then(function mySucces(response) {
        console.log(response.data);
        alert("Done");
        $scope.check(" ");
        
    }, function myError(response) {
        $scope.tutor.button = false;
        console.log(response);
        alert(response.data);
    });
    
    
    }




}])
 