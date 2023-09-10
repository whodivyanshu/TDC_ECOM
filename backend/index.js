import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import puppeteer from "puppeteer";
import cheerio from "cheerio";
import fetch from "node-fetch";

const app = express();
app.use(cors());
app.use(express.json());

const dataSchema = new mongoose.Schema({
  name: String,
  imageurl: String,
  price: String,
  description: String,
  category: String,
});

const adminSchema = new mongoose.Schema({
  number: String,
  id: String,
  searchName: String,
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

app.get("/run-puppeteer", async (req, res) => {
  try {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    const url = "https://www.myntra.com/";
    await page.goto(url);

    await page.type(".desktop-searchBar", "Mens Footwear");
    await page.keyboard.press("Enter");

    await page.waitForTimeout(5000);
    const content = await page.content();
    const $ = cheerio.load(content);
    let products = [];

    $(".product-base").each(async (index, element) => {
      if (index < 10) {
        const innerText = $(element).find(".product-product").text();
        const src = $(element)
          .find(".product-imageSliderContainer img")
          .attr("src");

        const price = $(element).find(".product-discountedPrice").text();
        const money = parseInt(price, 10);

        const newData = {
          name: innerText,
          imageurl: src,
          price: price,
          description: "",
        };

        try {
          const response = await fetch("http://localhost:3000/addData", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newData),
          });

          if (response.ok) {
            console.log("Data added successfully.");
          } else {
            console.error("Failed to add data.");
          }
        } catch (error) {
          console.error("Error while sending data:", error);
        }
      }
    });

    await browser.close();
    res.send("Puppeteer script completed successfully");
  } catch (error) {
    console.error("Error running Puppeteer script:", error);
    res.status(500).json({ error: "Error running Puppeteer script" });
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
