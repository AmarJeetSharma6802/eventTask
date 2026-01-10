import cron from "node-cron";
import axios from "axios";
import * as cheerio from "cheerio";
import DBconnect from "../db/DBconnect.js";
import Event from "../model/event.model.js";



export async function scrapeTimeout() {
  await DBconnect();

  const { data } = await axios.get(
    "https://www.timeout.com/sydney/things-to-do",
    {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120",
      },
    }
  );

  const $ = cheerio.load(data);

  let inserted = 0;

  $("article.tile").each(async (_, el) => {
    const title = $(el)
      .find("h3[data-testid='tile-title_testID']")
      .text()
      .trim();

    const link = $(el).find("a[data-testid='tile-link_testID']").attr("href");

    const category = $(el)
      .find("div._primaryCategory_wkzyo_122")
      .text()
      .trim() || "General";

    const image =
      $(el).find("img").attr("src") ||
      $(el).find("img").attr("data-src");

    if (!title || !link) return;

    await Event.updateOne(
      { sourceUrl: `https://www.timeout.com${link}` },
      {
        title,
        category,
        image,
        date: new Date(),
        sourceUrl: `https://www.timeout.com${link}`,
      },
      { upsert: true }
    );

    inserted++;
  });

  console.log(`✅ Scraping completed. Events processed: ${inserted}`);
}


export function startAutoScrape() {
  if (global.cronStarted) return; 
  global.cronStarted = true;

  cron.schedule("0 */6 * * *", async () => {
    console.log("⏰ Auto scraping started");
    await scrapeTimeout();
  });
}
