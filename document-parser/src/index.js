import PDFParser from "./parsers/pdfParser.js";
import DocxParser from "./parsers/docxParser.js";
import XlsxParser from "./parsers/xlxsParser.js";

(async function main(){
  const xlsxParser = new XlsxParser("../sample/sheet.xlsx");
  const parse = await xlsxParser.parser();
  console.log(parse);

})().catch(error => console.log(error))
export { PDFParser, DocxParser }
