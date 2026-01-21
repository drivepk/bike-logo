import fs from "fs";
import LogoScrapper from "./LogoScrapper";
import LocalLogosLoader from "./LocalLogosLoader";
import ImageOptimizer from "./ImageOptimizer";
import DataFinalizer from "./DataFinalizer";
import { LogosTargetLocation } from "./config";

(async function () {
  const existingOriginals =
    fs.existsSync(LogosTargetLocation.Original) &&
    fs.readdirSync(LogosTargetLocation.Original).length > 0;
  const shouldSkipScraper =
    existingOriginals && process.env.RUN_SCRAPER !== "true";

  const scrapedLogos = shouldSkipScraper
    ? []
    : await new LogoScrapper().run();

  if (shouldSkipScraper) {
    console.log(
      "Skipping car logo scraper because original logos already exist. Set RUN_SCRAPER=true to force scraping."
    );
  }

  const localLogos = await new LocalLogosLoader().run();
  const allLogos = [...scrapedLogos, ...localLogos];
  const images = await new ImageOptimizer().run();
  await new DataFinalizer({logos: allLogos, images}).run();
})();
