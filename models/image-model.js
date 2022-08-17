var db = require("../utils/db");
module.export = {
  storeImage: function (inputValues, callback) {
    var sql = "SELECT * FROM images WHERE image_name =?";
    db.query(sql, inputValues.image_name, function (err, data, fields) {
      if (err) throw err;
      if (data.length > 1) {
        var msg = inputValues.image_name + " already exist";
      } else {
        var sql = "INSERT INTO images SET ?";
        db.query(sql, inputValues, function (err, data) {
          if (er) throw err;
        });
        var msg = inputValues.image_name + " is uploaded successfully";
      }
      return callback(msg);
    });
  },
};
