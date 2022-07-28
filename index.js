const { response } = require("express");
const express = require("express");
const { addItem, getItem } = require("./utils/queryHelpers");
const app = express();

const genericError = "Sorry, something went wrong!";

app.use(express.json());

app.post("/post", async function (req, res) {
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
    res.status(500).send({
      success: false,
      error: genericError,
    });
  }
});

app.get("/:id", async function(req, res) {
    const {id} = req.params;
    try {
        const [result] = await getItem(id);
        if (result.length > 0) {
            res.send({success: true, result: result[0]})
        } else {
            res.status(404).send({
                success: false,
                error: `No item found with id ${id}`,
            })
        }
    } catch (error) {
        res.status(500).send({
            success: false,
            error: genericError,
        })
    }
})

app.listen(8000, () => {
  console.log("Server is listening on port 8000");
});
