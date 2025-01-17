import PDFParser from "../src/parsers/pdfParser.js";

(async function main() {
  const pdfParser = new PDFParser(null);
  const pdfResult = await pdfParser.parse();

  return pdfResult;
})();
