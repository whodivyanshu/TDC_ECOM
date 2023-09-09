import puppeteer from "puppeteer";
import cheerio from "cheerio";

(async () => {
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
})();
