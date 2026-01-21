import { ManufacturerLogos, PreFinalizedResults } from "./types";
import BaseClass from "./BaseClass";
import { LocalAccessPath, META_JSON_PATH, PublicAccessUrl } from "./config";

class DataFinalizer extends BaseClass {
  results: PreFinalizedResults;

  constructor(results: PreFinalizedResults) {
    super();
    this.results = results;
  }

  protected normalizeSlug(value: string) {
    return this.slugify(this.getFileNameFromPath(value), { lower: true });
  }

  protected buildLogosFromImages() {
    return this.results.images.originals.map((original) => {
      const slug = this.normalizeSlug(original);
      const name = this.getFileNameFromPath(original)
        .replace(/[-_]+/g, " ")
        .replace(/\s+/g, " ")
        .trim()
        .replace(/\b\w/g, (char) => char.toUpperCase());

      return {
        name,
        slug,
        image: { source: original },
      };
    });
  }

  protected getLogoVariations(slug: string) {
    const normalizedSlug = this.normalizeSlug(slug);
    const matchSlug = (file: string) => this.normalizeSlug(file) === normalizedSlug;

    const original = this.results.images.originals.find(matchSlug);
    const optimized = this.results.images.optimized.find(matchSlug);
    const thumb = this.results.images.thumbs.find(matchSlug);

    if (!original || !optimized || !thumb) {
      throw new Error(`Unable to find variations for ${slug}`);
    }

    return {
      thumb: PublicAccessUrl.Thumb(thumb),
      optimized: PublicAccessUrl.Optimized(optimized),
      original: PublicAccessUrl.Original(original),
      localThumb: LocalAccessPath.Thumb(thumb),
      localOptimized: LocalAccessPath.Optimized(optimized),
      localOriginal: LocalAccessPath.Original(original),
    };
  }

  protected composeResultsData(): ManufacturerLogos {
    const normalizedLogos = this.results.logos.map((logo) => ({
      ...logo,
      slug: this.normalizeSlug(logo.slug),
    }));

    const existingSlugs = new Set(normalizedLogos.map((logo) => logo.slug));
    const generatedLogos = this.buildLogosFromImages().filter(
      (logo) => !existingSlugs.has(logo.slug)
    );

    const logos = normalizedLogos.length
      ? [...normalizedLogos, ...generatedLogos]
      : this.buildLogosFromImages();

    return logos.map((logo) => {
      const variations = this.getLogoVariations(logo.slug);
      const image = { ...logo.image, ...variations };

      return { ...logo, image };
    });
  }

  public run() {
    console.log("Finalizing results.");

    try {
      const results = this.composeResultsData();

      // Sort the results by 'name' key alphabetically
      const sortedResults = results.sort((a, b) => a.name.localeCompare(b.name));

      this.writeJsonFileSync(META_JSON_PATH, JSON.stringify(sortedResults, null, 2));

      console.log(`Done, data saved to ${META_JSON_PATH}.`);
    } catch (e) {
      console.error(e);
    }
  }
}

export default DataFinalizer;
