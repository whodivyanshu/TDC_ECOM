const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const dataSchema = new mongoose.Schema({
  name: String,
  imageurl: String,
  price: Number,
  description: String,
  category: String,
});

const adminSchema = new mongoose.Schema({
  number: String,
  id: String,
});

const Data = mongoose.model("Data", dataSchema);

mongoose
  .connect(
    "mongodb+srv://divyanshu:1234@ecom.6l8v2zu.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((error) => {
    console.error("Connection to the database failed:", error);
  });

app.post("/addData", async (req, res) => {
  try {
    const { name, imageurl, price, description, category } = req.body;
    const data = new Data({
      name,
      imageurl,
      price,
      description,
      category,
    });
    await data.save();
    res.status(201).json(data);
  } catch (error) {
    console.error("Error saving data:", error);
    res.status(500).json({ error: "Error saving data" });
  }
});

app.get("/getData", async (req, res) => {
  try {
    const data = await Data.find({});
    res.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Error fetching data" });
  }
});

app.get("/getNumber", async (req, res) => {
  try {
    const Admin = mongoose.model("Admin", adminSchema, "admin");

    const result = await Admin.findOne({ id: "DivyanshuLoharID3322" });
    // const number = result.number;

    res.json(result);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Error fetching data" });
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
