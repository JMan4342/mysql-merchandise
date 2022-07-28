const express = require("express");
const { addItem, getItem } = require("./utils/queryHelpers");
const app = express();

const genericError = "Sorry, something went wrong!";

app.use(express.json());

app.post("/", async function (req, res) {
  try {
    const { name, category, description } = req.body;
    const [result] = await addItem(name, category, description);
    if (result.insertId) {
      const [data] = await getItem(result.insertId);
      res.send({ success: true, result: data[0] });
    } else {
      res.status(500).send({
        success: false,
        error: genericError,
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      error: genericError,
    });
  }
});

app.listen(8000);
console.log("Listening on localhost 8000");
