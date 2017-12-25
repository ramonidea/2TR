angular.module('app.services', [])

.factory('Cred', function() {

  cred = {};
  cred.name = "";
  cred.email = "";
  cred.login = false;
  cred.grade = "";
  cred.Tutor = false;
  cred.User = false;
  return {

        getCred: function () {
            return cred;
        },
        setCred: function (authObject) {
            cred = authObject;
        },
        reset: function(){
            cred = {};
            cred.name = "Guest";
            cred.email = "";
            cred.login = false;
            cred.grade = "";
            cred.Tutor = false;
            cred.User = true;
        }
    };

})

.factory('Requests',function(){
    request = {};
    request.subject = "";
    request.subsubject = "";

    return {
        getRequest: function () {
            return request;
        },
        setRequest: function (authObject) {
            request = authObject;
        }
    };

})



.service('BlankService', [function(){

}]);


var LoginoutService = angular.module('LoginoutService',[])

.service('UserService', ['$q', 'KinveyConfiguration', '$kinvey','Cred',
    function($q, KinveyConfiguration, $kinvey,Cred) {

      var initialized = false;


      return {

        /**
         *
         * @returns {*}
         */
        init: function() {
          try {
            var d = $q.defer();

            function getTheUser() {
              var d = $q.defer();
              $kinvey.User.me().then(function(currentUser) {
                return d.resolve(currentUser);
              }, function(err) {
                return d.reject({
                  error: "noUser"
                });
              });
              return d.promise;
            }

            console.log("in init");

            // if initialized, then return the activeUser
            if (initialized === false) {
              // Initialize Kinvey
              $kinvey.init(KinveyConfiguration).then(function() {
                  initialized = true;
                  console.log("in init: initialized");
                  return getTheUser();
                })
                .then(function(_user) {
                  console.log("in init got user: ", _user);
                  cred = {};
                  cred.name = _user.name;
                  cred.email = _user.email;
                  cred.login = true;
                  cred.grade = _user.grade;
                  cred.Tutor = _user.Tutor;
                  cred.User = _user.User;

                  return d.resolve(_user);
                }, function(err) {
                  console.log("in init error: ", err);
                  return d.reject({
                    error: "noUser",
                    kinveyError: err
                  });
                });
              return d.promise;
            } else {
              return getTheUser();
            }



          } catch (EE) {
            console.log(EE)
          }

        },
        /**
         *
         * @param _userParams
         */

        createUser: function(_email,_tutor,_user,_password,_name,_grade) {

          var promise = $kinvey.User.signup({
              username : _email,
              email:_email,
              tutor : _tutor,
              user:_user,
              password : _password,
              name: _name,
              grade : _grade
          });
          return promise;

        },



        /**
         *
         * @param _parseInitUser
         * @returns {Promise}
         */
        currentUser: function(_parseInitUser) {

          // if there is no user passed in, see if there is already an
          // active user that can be utilized

        },
        /**
         *
         * @param _user
         * @param _password
         * @returns {Promise}
         */
        login: function(_user, _password) {
          return $kinvey.User.login({
            username: _user,
            password: _password
          });
        },
        /**
         *
         * @returns {Promise}
         */
        logout: function(_callback) {

          var defered = $q.defer();

          var user = $kinvey.getActiveUser();
          if (null !== user) {
            $kinvey.User.logout().then(function() {
              console.log("logged out", user);
            }, function(err) {
              console.log("Error: logged out", err);
            });
          }
        }

      }
    }
  ]);
