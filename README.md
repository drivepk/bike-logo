# Bike Logos Dataset 🏍️

A curated collection of **motorcycle, scooter, and EV bike manufacturer logos** with multiple size variations and metadata. This dataset provides high-quality logos in different formats, making it perfect for mobility/automotive applications, dashboards, catalogs, or design projects.

## 📦 Features

- **Multiple bike and EV brands** (international + local)
- **Three image variants** for each logo (when available):
  - Original high‑resolution images
  - Optimized versions (smaller file size, maintained visual quality)
  - Thumbnails (256px height)
- **Structured JSON metadata** for each logo in `logos/data.json`
- **Support for local/custom brands** via `local-logos/metadata.json`
- MIT licensed project code (logos remain property of respective owners)

## 📂 Repository Structure

```text
/logos
  /optimized/   # Optimized logos with reduced file size
  /thumb/       # 256px height thumbnails
  /orignal/     # Original crawled images (note: directory name is 'orignal')
  data.json     # Metadata for all logos
/local-logos    # Custom/local logos with metadata
  metadata.json # Local logos metadata
  *.png         # Local logo files (e.g. Cupra, Jetour, Omoda, SEV)
/src            # Source code for crawler, optimizer, and data finalizer
```

## 🛠 Installation & Running the Pipeline

Requirements:

- **Node.js >= 16**
- **npm** or **pnpm**

```bash
# Install dependencies
npm install

# Run the crawler + optimizer + data finalizer
npm start
```

**⚠️ Processing Time:** The script runs image optimization over all logos, which can take several minutes depending on your machine and how many brands are enabled in the configuration.

## 🧩 How It Works (Overview)

- `LogoScrapper.ts` – scrapes/fetches logo images from configured sources.
- `ImageOptimizer.ts` – resizes and compresses logos into `optimized/` and `thumb/`.
- `LocalLogosLoader.ts` – loads additional local logos from `local-logos/`.
- `DataFinalizer.ts` – generates the final `logos/data.json` file with metadata and paths.
- `index.ts` – orchestrates the full pipeline.

All logic is written in **TypeScript** and runs via `tsx` using the script defined in `package.json`.

## 📝 Using the Dataset

After running `npm start`, your project can reference logos using the generated metadata:

```ts
// Example: loading metadata inside a Node/TypeScript project
import logos from "./logos/data.json" assert { type: "json" };

// Each entry contains brand info and paths to logo assets
console.log(logos[0]);
```

For static hosting or integration into a frontend app, you can expose the `logos/` directory and use the paths from `data.json` directly (e.g. `logos/thumb/aima.png`, `logos/optimized/vlektra.png`, etc.).

## 🤝 Contributing

Contributions are welcome, especially:

- Adding new bike/EV brands
- Improving scraping robustness or optimization settings
- Enhancing metadata (regions, fuel type, EV/ICE flags, etc.)

Typical flow:

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/add-new-brand`).
3. Make changes and run `npm start` to regenerate assets/metadata.
4. Commit and push your branch.
5. Open a Pull Request with a short description and screenshots/logs if relevant.

## 📄 License & Logo Ownership

This project’s **code** is licensed under the MIT License.  
All logo images are the property of their respective owners and are subject to their own licensing terms. Use them responsibly and according to applicable laws and brand guidelines.

