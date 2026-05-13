import * as pdfjsLib from "pdfjs-dist";
// @ts-expect-error - vite resolves worker via ?url
import workerUrl from "pdfjs-dist/build/pdf.worker.min.mjs?url";

pdfjsLib.GlobalWorkerOptions.workerSrc = workerUrl;

export async function extractPdfText(file: File): Promise<string> {
  const buffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: buffer }).promise;
  const partes: string[] = [];
  const maxPaginas = Math.min(pdf.numPages, 80);
  for (let i = 1; i <= maxPaginas; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const texto = content.items
      .map((item) => ("str" in item ? (item as { str: string }).str : ""))
      .join(" ");
    partes.push(texto);
  }
  return partes.join("\n\n").replace(/\s+/g, " ").trim();
}
