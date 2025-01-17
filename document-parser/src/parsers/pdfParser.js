import { getDocument } from "pdfjs-dist";

class PDFParser {
  constructor(filePath) {
    if (!filePath) {
      throw new Error("File path is required to initialize the PDFParser.");
    }
    this.filePath = filePath;
  }

  /**
   * Extracts and formats text and tables (if present) from a PDF.
   * @returns {Promise<object>} - Object: metadata and formatted text.
   */
  async parse() {
    try {
      const pdf = await getDocument(this.filePath).promise;
      const totalPages = pdf.numPages;
      let formattedOutput = "";
      const { info } = await pdf.getMetadata();

      for (let pageNumber = 1; pageNumber <= totalPages; pageNumber++) {
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
      throw new Error("Error parsing PDF: Missing PDF file");
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
}

export default PDFParser;
