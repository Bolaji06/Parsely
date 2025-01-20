import PDFParser from "./parsers/pdfParser.js";

(async function main(){
  const pdfParser = new PDFParser("../sample/sample.pdf");
  const parser = await pdfParser.parse([1]);
  //console.log(pdfParser.json(parser.text));
  console.log(pdfParser.markdown(parser.text))


})().catch(error => console.log(error))
//export { PDFParser }
