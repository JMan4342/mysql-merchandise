const express = require("express");
const {
  addItem,
  getItem,
  getAllItems,
  updateDescription,
  deleteItem,
} = require("./utils/queryHelpers");
const app = express();

const genericError = "Sorry, something went wrong!";

app.use(express.json());

app.get("/", async function (req, res) {
  try {
    const [result] = await getAllItems();
    res.send({ success: true, result });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error: genericError,
    });
  }
});

app.post("/", async function (req, res) {
  try {
    const { name, category, description } = req.body;
    const [result] = await addItem(name, category, description);
    if (result.insertedId) {
      const [data] = await getItem(result.insertedId);
      res.send({ success: true, result: data });
    } else {
      res.status(500).send({
        success: false,
        error: genericError,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error: genericError,
    });
  }
});

app.get("/:id", async function (req, res) {
  const { id } = req.params;
  try {
    const [result] = await getItem(id);
    if (result.length > 0) {
      res.send({ success: true, result: result[0] });
    } else {
      res.status(404).send({
        success: false,
        error: `No item found with id ${id}`,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error: genericError,
    });
  }
});

app.put("/:id", async function (req, res) {
  try {
    const { name, category, description } = req.body;
    const { id } = req.params;
    const [result] = await updateDescription(id, name, category, description);
    if (result.affectedRows > 0) {
      const [data] = await getItem(id);
      res.send({ success: true, result: data[0] });
    } else {
      res.status(400).send({
        success: false,
        error: genericError,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error: genericError,
    });
  }
});

app.delete("/:id", async function (req, res) {
  try {
    const { id } = req.params;
    const [result] = await deleteItem(id);
    if (result.affectedRows > 0) {
      res.send({ success: true, message: "Item successfully deleted" });
    } else {
      res.status(400).send({
        success: false,
        error: genericError,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error: genericError,
    });
  }
});

app.listen(8000, () => {
  console.log("Server is listening on port 8000");
});
