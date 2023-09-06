const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json()); // Parse JSON requests

// Define a mongoose schema for your data
const dataSchema = new mongoose.Schema({
  name: String,
  age: Number,
});

// Create a mongoose model based on the schema
const Data = mongoose.model("Data", dataSchema);

// Connect to the MongoDB database
mongoose
  .connect("mongodb+srv://divyanshu:1234@ecom.6l8v2zu.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database");
    // Add some sample data
    for (let i = 1; i <= 10; i++) {
      const newData = new Data({
        name: `Person ${i}`,
        age: 20 + i,
      });
      newData.save().then(() => {
        console.log(`Added: ${newData}`);
      });
    }
  })
  .catch((error) => {
    console.error("Connection to the database failed:", error);
  });

// Define a route to fetch the data
app.get("/getData", async (req, res) => {
  try {
    const data = await Data.find({});
    res.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Error fetching data" });
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
