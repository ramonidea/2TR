angular.module('kinvey.init', ['kinvey'])

.config(['$kinveyProvider', function($kinveyProvider) {
    // Initialize Kinvey
    $kinveyProvider.init({
        appKey: 'kid_r1LNZMGSx',
        appSecret: 'c2a6d741b6f64e0e8726a6b1d3c94f39'
    });
}])

// Feel free to uncomment this example code to add functionality to your project

/*

.service('User', ['$kinvey', '$q', function($kinvey, $q) {
    var User = {
      getActiveUser: function() {
        return $kinvey.User.getActiveUser();
      },

      login: function(username, password) {
        var user = User.getActiveUser();

        if (!user) {
          return $kinvey.User.login(username, password);
        }

        return $q.resolve(user);
      },

      logout: function() {
        var user = User.getActiveUser();

        if (user) {
          return user.logout();
        }

        return $q.resolve(null);
      }
    };
    return User;
}])

*/

/*

.service('books', ['$kinvey', function($kinvey) {
  var store = $kinvey.DataStore.collection('books');

  return {
    find: function(query) {
      return store.find(query);
    },

    save: function(book) {
      return store.save(book);
    }
  };
}]);

*/