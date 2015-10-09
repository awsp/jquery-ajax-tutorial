var db = require('../db_store').db;
var Q = require('Q');

module.exports = {
  /**
   * Create a `users` table and insert some test data.
   */
  init: function () {
    db.serialize(function () {
      db.run('CREATE TABLE `users` (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT)');

      var stmt = db.prepare('INSERT INTO `users` (username) VALUES (?)');
      stmt.run('baz');
      stmt.finalize();
    });
  },

  /**
   * Get all users.
   * @returns {*}
   */
  getAllUser: function () {
    var deferred = Q.defer();
    db.all('SELECT * FROM `users`', function (err, users) {
      if (err) {
        deferred.reject(err)
      }
      else {
        deferred.resolve(users);
      }
    });

    return deferred.promise;
  },

  /**
   * Insert a user.
   * @param user
   * @returns {promise.promise|Function|*|jQuery.promise|d.promise|promise}
   */
  insertUser: function (user) {
    var deferred = Q.defer();
    db.serialize(function () {
      var stmt = db.prepare('INSERT INTO `users` (username) VALUES (?)'); 
      stmt.run(user.username);
      stmt.finalize(function (err) {
        deferred.resolve(err ? false : true);
      });
    });
    return deferred.promise;
  }
};