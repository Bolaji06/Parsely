import mammoth from "mammoth";

/**
 * DocxParser class: Parses Word documents
 */
class DocxParser {

  /**
   * @type {string} Docx file path (private)
   */
  #filePath

  /**
   * Creates an instance of DocxParser.
   * @param {string} filePath - The URL of the webpage to be parsed.
   * @throws {Error} Throws an error if no file path is provided during initialization.
   */
  constructor(filePath) {
    if (!filePath) {
      throw new Error("File path is required to initialize docx parser");
    }
    this.#filePath = filePath;
  }
  /**
   * Parses the word document
   * @returns {Promise<string>} - Extracted text from the document
   */
  async parser() {
    try {
      const parse = await mammoth.extractRawText({ path: this.#filePath });
      return parse.value;
    } catch (error) {
        throw new Error("Error parsing document: " + error.message);
    }
  }
}

export default DocxParser;
