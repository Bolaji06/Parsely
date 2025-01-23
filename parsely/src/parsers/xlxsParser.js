import * as XLSX from "xlsx";
import { readFileSync } from "fs";

/**
 * @class
 * Class for parsing sheets
 */
class XlsxParser {
  /**
   * 
   * @description File path of sheet to be parsed (Private)
   */
  #filePath;
  constructor(filePath) {
    if (!filePath) {
      throw new Error("File path is required for initialization");
    }
    this.#filePath = filePath;
  }

  /**
   * @async
   * Parses the sheet document from a file path
   * @returns {Promise<Record<string, string>>}
   */
  async parser() {
    try {
      const buf = readFileSync(this.#filePath);
      const workbook = XLSX.read(buf);
      const sheets = workbook.Sheets;
      const sheetNames = workbook.SheetNames;

      return sheetNames.map((sheet) => {
        const rawText = XLSX.utils.sheet_to_txt(sheets[sheet]);
        const cleanedText = rawText.replace(/\x00/g, ""); // Remove null characters
        return {
          sheet,
          workspace: cleanedText,
        };
      });
    } catch (error) {
      throw new Error("Error: " + error.message);
    }
  }
}

export default XlsxParser;
