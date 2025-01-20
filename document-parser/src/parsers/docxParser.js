import mammoth from "mammoth";

/**
 * DocxParser class: Parses Word documents
 */
class DocxParser {
  constructor(filePath) {
    if (!filePath) {
      throw new Error("File path is required to initialize docx parser");
    }
    this.filePath = filePath;
  }
  /**
   * Parses the word document
   * @returns {Promise<string>} - Extracted text from the document
   */
  async parser() {
    try {
      const parse = await mammoth.extractRawText({ path: this.filePath });
      return parse.value;
    } catch (error) {
        throw new Error("Error parsing document: " + error.message);
    }
  }
}

export default DocxParser;
