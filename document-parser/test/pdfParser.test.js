import path from "path";
import { join } from "path";
import PDFParser from "../src/parsers/pdfParser";

describe("PDFParser class", () => {
  const samplePDF = path.resolve("../sample/sample.pdf");
  test("should parse text and metadata from a valid pdf files", async () => {
    const parser = new PDFParser(samplePDF);
    const result = await parser.parse();

    expect(result).toHaveProperty("text");
    expect(result).toHaveProperty("metadata");

    expect(result.metadata.totalPages).toBeGreaterThan(0);
  });

  test("should throw an error for an invalid file path", async () => {
    const parser = new PDFParser("./invalid.pdf");
    await expect(parser.parse()).rejects.toThrow("Error parsing PDF: Missing PDF file");
  });

  test("should throw an error if no pdf path", async () => {
     expect(() => new PDFParser()).toThrow("File path is required to initialize the PDFParser.")
  })
});
