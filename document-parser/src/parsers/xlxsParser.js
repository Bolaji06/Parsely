import * as XLSX from "xlsx";
import { readFileSync } from "fs";

class XlsxParser {
  constructor(filePath) {
    this.filePath = filePath;
    if (!filePath) {
      throw new Error("File path is required for initialization");
    }
  }
  async parser() {
    try {
      const buf = readFileSync(this.filePath);
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
