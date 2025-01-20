import PDFParser from "./parsers/pdfParser.js";
import DocxParser from "./parsers/docxParser.js";

(async function main(){
  const wordParser = new DocxParser("../sample/resume.docx");
  const result = await wordParser.parser();
  console.log(result);

})().catch(error => console.log(error))
export { PDFParser, DocxParser }
