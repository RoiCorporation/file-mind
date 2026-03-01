import { useState } from "react";
import { API_BASE } from "@/lib/api";

const DocumentDrawer = ({ document, onClose }) => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);

  if (!document) return null;

  const {
    id,
    file_id,
    pk,
    name,
    author,
    category,
    format,
    content,
    file_metadata
  } = document;

  const fileId = id ?? file_id ?? pk;

  const parsePdfDate = (pdfDate) => {
    if (!pdfDate) return "—";
    const match = pdfDate.match(/^D:(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/);
    if (!match) return pdfDate;
    const [, year, month, day, hour, minute] = match;
    return `${day}/${month}/${year} ${hour}:${minute}`;
  };

  const generateSummary = async () => {
    if (!fileId) {
      console.error("No file id found:", document);
      return;
    }

    setLoading(true);
    setSummary(null);

    try {
      const res = await fetch(`${API_BASE}/v1/ai/file_summary/?${params.toString()}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            file_id: fileId,
            model: "gpt-4.1-mini"
          })
        }
      );

      if (!res.ok) throw new Error("Request failed");

      const data = await res.json();


      setSummary(data.answer ?? data.summary ?? "Sin resumen");
    } catch (err) {
      console.error(err);
      setSummary("Error generando resumen");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="position-fixed top-0 end-0 bg-white shadow-lg p-4"
      style={{ width: "400px", height: "100vh", zIndex: 1050, overflowY: "auto" }}
    >
      <div className="d-flex justify-content-between align-items-start mb-3">
        <h5 className="mb-0">{name}</h5>
        <button className="btn-close" onClick={onClose}></button>
      </div>

      <p><strong>Autor:</strong> {author}</p>
      <p><strong>Categoría:</strong> {category}</p>
      <p><strong>Formato:</strong> {format}</p>

      {file_metadata && (
        <>
          <hr />
          <h6>Metadatos del archivo</h6>
          <p><strong>Fecha de creación:</strong> {parsePdfDate(file_metadata?.creationdate)}</p>
          <p><strong>Última modificación:</strong> {parsePdfDate(file_metadata?.moddate)}</p>
          <p><strong>Páginas:</strong> {file_metadata.pages}</p>
          <p><strong>Encriptado:</strong> {file_metadata.encrypted ? "Sí" : "No"}</p>
        </>
      )}

      <hr />


      <pre style={{ whiteSpace: "pre-wrap", fontFamily: "inherit" }}>
        {content}
      </pre>

      <button
        className="btn btn-primary w-100 mb-3"
        onClick={generateSummary}
        disabled={loading}
      >
        {loading ? "Generando resumen..." : "Generar resumen con IA"}
      </button>

      {summary && (
        <>
          <h6>Resumen</h6>
          <p>{summary}</p>
          <hr />
        </>
      )}
    </div>
  );
};

export default DocumentDrawer;