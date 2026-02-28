const DocumentDrawer = ({ document, onClose }) => {
  if (!document) return null;

  const { name, author, category, format, content, file_metadata } = document;

  const parsePdfDate = (pdfDate) => {
    if (!pdfDate) return "—";
    const match = pdfDate.match(/^D:(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/);
    if (!match) return pdfDate; // si no coincide, devolvemos crudo
    const [, year, month, day, hour, minute, second] = match;
    return `${day}/${month}/${year} ${hour}:${minute}`;
  };

  return (
    <div
      className="position-fixed top-0 end-0 bg-white shadow-lg p-4"
      style={{
        width: "400px",
        height: "100vh",
        zIndex: 1050,
        overflowY: "auto"
      }}
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
          <p><strong>Título:</strong> {name}</p>
          <p><strong>Autor:</strong> {file_metadata.author}</p>
          <p><strong>Creador:</strong> {file_metadata.creator}</p>
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
    </div>
  );
};

export default DocumentDrawer;