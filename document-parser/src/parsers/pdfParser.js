import { getDocument } from "pdfjs-dist";

/**
 * Class PDFParser parses pdf file to a text format
 */
class PDFParser {

   /**
   * file path of a pdf file to parse (private)
   * @type {string}
   */
  #filePath

  
  /**
   * Creates an instance of PDFParser.
   * @param {string} filePath - The file path of the pdf to be parsed.
   * @throws {Error} Throws an error if no file path is provided during initialization.
   */
  constructor(filePath) {
    if (!filePath) {
      throw new Error("File path is required to initialize the PDFParser.");
    }
    /**
     * @type {string}
     */
    this.#filePath = filePath;
  }

  /**
   * @async
   * Extracts and formats text and tables (if present) from a PDF.
   * @param {Array<number>|null} pageRange - Number of page to parse. e.g parse([2, 3])
   * @returns {Promise<object>} - Object: metadata and formatted text.
   */
  async parser(pageRange = null) {
    try {
      const pdf = await getDocument(this.#filePath).promise;
      const totalPages = pdf.numPages;
      let formattedOutput = "";
      const { info } = await pdf.getMetadata();

      const pagesToProcess = pageRange
        ? pageRange.filter((page) => page >= 1 && page <= totalPages)
        : Array.from({ length: totalPages }, (_, i) => i + 1);

      for (const pageNumber of pagesToProcess) {
        const page = await pdf.getPage(pageNumber);
        const textContent = await page.getTextContent();

        // Extract and format text
        const pageText = this.#processPageText(textContent.items);
        formattedOutput += pageText;

        // Add page breaks
        formattedOutput += `\n--- Page ${pageNumber} ---\n`;
      }

      return {
        metadata: {
          title: info.Title || null,
          author: info.Author || null,
          subject: info.Subject || null,
          keywords: info.Keywords || null,
          creationDate: info.CreationDate || null,
          modificationDate: info.ModDate || null,
          producer: info.Producer || null,
          totalPages: totalPages,
        },
        text: formattedOutput,
      };
    } catch (error) {
      throw new Error("Error parsing PDF: Missing PDF file " + error.message);
    }
  }

  /**
   * Processes and formats text content from a PDF page.
   * @param {Array} textItems - Text items extracted from the page.
   * @returns {string} - Formatted page text.
   */
  #processPageText(textItems) {
    let formattedText = "";
    let currentLine = "";

    textItems.forEach((item, index) => {
      const text = item.str.trim();

      // Check for table-like structures (aligned columns)
      if (this.#isTableRow(text)) {
        formattedText += this.#formatTableRow(text) + "\n";
      } else {
        // Continue building regular text lines
        if (text) currentLine += ` ${text}`;

        // Add a line break if the next item is on a new line
        const nextItem = textItems[index + 1];
        if (!nextItem || this.#isNewLine(item, nextItem)) {
          formattedText += currentLine.trim() + "\n";
          currentLine = "";
        }
      }
    });

    return formattedText.trim();
  }

  /**
   * Private method Determines if a text item represents a table row.
   * @param {string} text - The text to analyze.
   * @returns {boolean} - True if it looks like a table row.
   */
  #isTableRow(text) {
    return /\s{2,}/.test(text); // Detect multiple spaces, common in tables
  }

  /**
   * Private method Formats a table row by aligning columns neatly.
   * @param {string} row - The raw table row text.
   * @returns {string} - Formatted table row.
   */
  #formatTableRow(row) {
    const columns = row.split(/\s{2,}/).map((col) => col.trim());
    return columns.join(" | ");
  }

  /**
   * Private method Checks if the current text item starts a new line compared to the next item.
   * @param {Object} currentItem - The current text item.
   * @param {Object} nextItem - The next text item.
   * @returns {boolean} - True if the next item starts a new line.
   */
  #isNewLine(currentItem, nextItem) {
    return nextItem && currentItem.transform[5] !== nextItem.transform[5];
  }

  /**
   * Converts parse PDF contents to JSON
   * @param {String} content - Parsed PDF contents
   * @returns {String} - Parsed document
   */
  json(content) {
    return JSON.stringify(content, null, 0);
  }

  /**
   * Converts parsed document to markdown format
   * @param {string} - Parsed text content
   * @returns {String} - The PDF content in Markdown format.
   */
  markdown(content) {
    let markdownText = "";
    if (this.#isHeading) {
      markdownText += `### ${content} \n`;
    }
    if (this.#isListItem) {
      markdownText += `- ${content} \n`;
    }
    return markdownText.trim();
  }

  /**
   * Determines if a line is a heading.
   * @param {string} text - The text to analyze.
   * @returns {boolean} - True if the text is a heading.
   */
  #isHeading(text) {
    return text.match(/^[A-Z][A-Z\s]+$/); // Example: All uppercase text as a heading
  }

  /**
   * Determines if a line is a list item.
   * @param {string} text - The text to analyze.
   * @returns {boolean} - True if the text looks like a list item.
   */
  #isListItem(text) {
    return text.match(/^[-*•]\s.+/); // Example: Starts with bullet points
  }
}
export default PDFParser;
