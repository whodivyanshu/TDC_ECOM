import puppeteer from "puppeteer";
import cheerio from "cheerio";

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  const number = [];
  await page.setViewport({ width: 1080, height: 1024 });
  async function fetchNumber() {
    try {
      const response = await fetch("http://localhost:3000/getNumber");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      number = data;

      console.log("Fetched data:", data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  fetchNumber();
  console.log(number);

  const url = "https://www.bewakoof.com/";
  await page.goto(url);

  await page.type(".searchInput", "Mens");
  await page.keyboard.press("Enter");

  await page.waitForSelector(".productCardBox");
  await page.waitForSelector(".productCardImg .productImgTag");

  const content = await page.content();
  const $ = cheerio.load(content);

  const products = [];

  $(".productCardBox").each((index, element) => {
    const name = $(".clr-shade4", element).text();
    const imageurl = $(".productCardImg .productImgTag", element).attr("src");
    products.push({ name, imageurl });
  });

  console.log(products);

  await browser.close();
})();
