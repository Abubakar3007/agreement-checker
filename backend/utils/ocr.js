const Tesseract = require("tesseract.js"); // tesseract require
const path = require("path"); // path require
const fs = require("fs-extra"); // file system require
const pdf = require("pdf-poppler");

async function extractText(filePath) {
  
  const absolutePath = path.isAbsolute(filePath) ? filePath : path.resolve(process.cwd(), filePath);

  console.log("📄 OCR INPUT:", absolutePath);

  // ---------- PDF ----------
  if (absolutePath.toLowerCase().endsWith(".pdf")) {
    const outputDir = path.join(
      process.cwd(),
      "temp",
      path.basename(absolutePath, ".pdf") + "_" + Date.now()
    );

    await fs.ensureDir(outputDir);

    await pdf.convert(absolutePath, {
      format: "png",
      out_dir: outputDir,
      out_prefix: "page",
      page: null,
      dpi: 300,
    });

    const images = (await fs.readdir(outputDir))
      .filter(f => f.endsWith(".png"))
      .map(f => path.join(outputDir, f));

    let fullText = "";

    for (const img of images) {
      const { data } = await Tesseract.recognize(img, "eng+hin");
      fullText += "\n" + data.text;
    }

    await fs.remove(outputDir);
    return fullText;
  }

  // ---------- IMAGE ----------
  const { data } = await Tesseract.recognize(absolutePath, "eng+hin");
  return data.text;
}

module.exports = extractText;