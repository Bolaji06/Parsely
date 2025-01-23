# Parsely

**Parsely** is a lightweight JavaScript library for parsing various types of documents and web pages. It provides easy-to-use parsers for extracting and processing data from PDFs, Word documents, Excel spreadsheets, and web pages.

---

## Features

- Parse **PDF** documents and extract text, tables, and metadata.
- Parse **Word (DOCX)** documents to extract raw text.
- Parse **Excel (XLSX)** files to extract data from sheets.
- Parse **Web Pages** to extract HTML content and metadata.
- Lightweight and modular design, allowing you to use only the parsers you need.

---

## Installation

Install Parsely via npm:

```bash
npm install "@bj.dev/parsely"
```

---

## Usage

### Importing Parsers

```javascript
import { PDFParser, DocxParser, XlsxParser, WebParser } from "@bj.dev/parsely";
```

### Parsing a PDF Document

```javascript
const pdfParser = new PDFParser("path/to/document.pdf");

(async () => {
  const result = await pdfParser.parse();
  console.log(result);
})();
```

### Parsing a Word Document

```javascript
const docxParser = new DocxParser("path/to/document.docx");

(async () => {
  const text = await docxParser.parse();
  console.log(text);
})();
```

### Parsing an Excel Spreadsheet

```javascript
const xlsxParser = new XlsxParser("path/to/spreadsheet.xlsx");

(async () => {
  const data = await xlsxParser.parse();
  console.log(data);
})();
```

### Parsing a Web Page

```javascript
const webParser = new WebParser("https://example.com");

(async () => {
  const html = await webParser.parse();
  console.log(html);
})();
```

---

## API Reference

### PDFParser

- **Constructor**: `new PDFParser(filePath)`
  - `filePath` (String): Path to the PDF file.
- **Method**: `parse()`
  - Returns a Promise resolving to an object with metadata and text content.

### DocxParser

- **Constructor**: `new DocxParser(filePath)`
  - `filePath` (String): Path to the DOCX file.
- **Method**: `parse()`
  - Returns a Promise resolving to the raw text of the document.

### XlsxParser

- **Constructor**: `new XlsxParser(filePath)`
  - `filePath` (String): Path to the XLSX file.
- **Method**: `parse()`
  - Returns a Promise resolving to an array of sheet data.

### WebParser

- **Constructor**: `new WebParser(webUrl)`
  - `webUrl` (String): URL of the web page to parse.
- **Method**: `parse()`
  - Returns a Promise resolving to the HTML content of the page.

---

## Contributing

Contributions are welcome! If you encounter bugs or have feature requests, please open an issue or submit a pull request on [GitHub](https://github.com/Bolaji06/Parsely).

---

## License

This project is licensed under the MIT License. See the [LICENSE](https://opensource.org/license/bsd-2-clause) file for details.

---

## Author

Created by Bolaji Bolajoko.
