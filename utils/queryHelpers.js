const getConnection = require("./db");

const addItem = async (name, category, description) => {
  const connection = await getConnection();
  return connection.execute(
    "INSERT INTO Item (name, category, description) VALUES (?,?,?)",
    [name, category, description]
  );
};

const getAllItems = async () => {
  const connection = await getConnection();
  return connection.execute(
    "select i.id,i.name,c.name category,i.description from item i,category c where i.category=c.id order by i.id"
  );
};

const getItem = async (id) => {
  const connection = await getConnection();
  return connection.execute(
    "select i.id,i.name,c.name category,i.description from item i, category c where i.category=c.id and i.id=?",
    [id]
  );
};

const updateDescription = async (id, name, category, description) => {
  const connection = await getConnection();
  return connection.execute(
    "UPDATE item SET name=?, category=?, description=? WHERE id=?",
    [name, category, description, id]
  );
};

const deleteItem = async (id) => {
  const connection = await getConnection();
  return connection.execute("DELETE from item where id=?", [id]);
};

module.exports = {
  addItem,
  getAllItems,
  getItem,
  updateDescription,
  deleteItem,
};
