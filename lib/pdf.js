  // lib/pdf.js
  import pdf from 'pdf-parse/lib/pdf-parse.js';

  export async function extractText(buffer) {
    // Pastikan buffer ada
    if (!buffer) {
      throw new Error("Buffer tidak ditemukan.");
    }

    try {
      // pdf-parse memerlukan buffer sebagai argumen pertama
      const data = await pdf(buffer);
      
      if (!data || !data.text) {
        throw new Error("Teks tidak ditemukan dalam PDF.");
      }

      return data.text.trim();
    } catch (error) {
      console.error("PDF Extraction Error:", error);
      // Memberikan info lebih detail jika library tidak sengaja terlewat
      if (error.code === 'MODULE_NOT_FOUND') {
        throw new Error("Library pdf-parse tidak terpasang di server.");
      }
      throw new Error("Gagal mengekstrak teks dari PDF.");
    }
  }