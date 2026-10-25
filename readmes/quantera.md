## overview

turns scanned and photographed medical reports into structured data, then lets you ask questions about them in plain language.

## pipeline

1. **read:** OCR extracts text from scanned and photographed reports.
2. **extract:** an LLM pulls structured values out of the unstructured text.
3. **ask:** a RAG-powered assistant answers questions using the extracted report.
4. **explain:** answers come back in plain language, so report data is easier to understand.

## highlights

- **works on real-world scans:** an OCR pipeline built for scanned and photographed reports.
- **structured output:** LLM-based extraction turns messy report text into clean values.
- **grounded answers:** RAG keeps responses tied to the report itself.
- **plain language:** results are explained simply instead of dumped as raw values.
