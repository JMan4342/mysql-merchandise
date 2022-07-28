const getConnection = require("./db");

const addItem = async (name, category, description) => {
  const connection = await getConnection();
  return connection.execute(
    "INSERT INTO ITEM (name, category, description) values (?,?,?)",
    [name, category, description]
  );
};

module.exports = {
  addItem,
};
