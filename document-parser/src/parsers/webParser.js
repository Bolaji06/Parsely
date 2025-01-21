import * as cheerio from "cheerio";

/**
 * Class for parsing webpage given url
 */
class WebParser {
  /**
   * URL of a webpage to parse (private)
   * @type {string}
   */
  #webUrl;

  /**
   * Creates an instance of WebParser.
   * @param {string} webUrl - The URL of the webpage to be parsed.
   * @throws {Error} Throws an error if no URL is provided during initialization.
   */
  constructor(webUrl) {
    if (!webUrl) {
      throw new Error("Web parser must be initialize with url");
    }

    this.#webUrl = webUrl;
  }

  /**
   *
   * @default section
   * @param {String} selector - HTML element selector e.g .class, div > p, [data-selected=true] etc
   * @returns {Promise<Record<string, string>>}
   */
  async parser(selector = "section") {
    try {
      if (!this.#webUrl.startsWith("https")) {
        throw new Error("Invalid url: " + this.#webUrl);
      }
      const request = await fetch(this.#webUrl);
      if (!request.ok) {
        throw new Error("Failed to fetch content from: " + this.#webUrl);
      }
      const content = await request.text();
      const $ = cheerio.load(content);
      const $selected = $(selector).text();

      return {
        url: this.#webUrl,
        pageContent: $selected,
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }
}

export default WebParser;
