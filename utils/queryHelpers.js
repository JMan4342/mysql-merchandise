const getConnection = require("./db");

const addItem = async (name, category, description) => {
  const connection = await getConnection();
  return connection.execute(
    "INSERT INTO ITEM (name, category, description) values (?,?,?)",
    [name, category, description]
  );
};

const getItem = async (id) => {
  const connection = await getConnection();
  return connection.execute(
    "select i.id,i.name,c.name category,i.description from item i, category c where i.category=c.id and i.id=?",
    [id]
  );
};

module.exports = {
  addItem,
  getItem,
};
