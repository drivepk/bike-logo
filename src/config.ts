import path from "path";
import fs from "fs";

export const BASE_URL = "https://www.carlogos.org";

export const BASE_PUBLIC_ACCESS_URL =
  "https://raw.githubusercontent.com/drivepk/bike-logo/master";

export const THUMB_HEIGHT = 256;

export const META_JSON_PATH = path.resolve("./logos/data.json");

const ORIGINAL_DIR = path.resolve("./logos/original");
const ORIGINAL_FALLBACK_DIR = path.resolve("./logos/orignal");

const resolveOriginalDir = () => {
  if (fs.existsSync(ORIGINAL_DIR)) return ORIGINAL_DIR;
  if (fs.existsSync(ORIGINAL_FALLBACK_DIR)) return ORIGINAL_FALLBACK_DIR;
  return ORIGINAL_DIR;
};

export const LogosTargetLocation = {
  Optimized: path.resolve("./logos/optimized"),
  Thumbs: path.resolve("./logos/thumb"),
  Original: resolveOriginalDir(),
};

const ORIGINAL_FOLDER_NAME = path.basename(LogosTargetLocation.Original);

export const LocalAccessPath = {
  Optimized: (file: string) => `./optimized/${file}`,
  Thumb: (file: string) => `./thumb/${file}`,
  Original: (file: string) => `./${ORIGINAL_FOLDER_NAME}/${file}`,
};

export const PublicAccessUrl = {
  Thumb: (file: string) => `${BASE_PUBLIC_ACCESS_URL}/logos/thumb/${file}`,
  Original: (file: string) =>
    `${BASE_PUBLIC_ACCESS_URL}/logos/${ORIGINAL_FOLDER_NAME}/${file}`,
  Optimized: (file: string) =>
    `${BASE_PUBLIC_ACCESS_URL}/logos/optimized/${file}`,
};

export const Url = {
  AllManufacturers: `${BASE_URL}/car-brands-a-z`,
  Manufacturer: (url: string) => `${BASE_URL}/${url}`,
};

export const Selectors = {
  AllManufacturers: ".a-z dd a",
  Logos: {
    ManufacturerLogo: `div.logo-content a img`,
    ManufacturerLogoAlt: `div.logo-art div.content p img`,
    ManufacturerLogoWithHistory: `div.logo-art div.present a img`,
    ManufacturerLogoCurrent: `div.logo-art div.current p.shadow a img`,
  }
};