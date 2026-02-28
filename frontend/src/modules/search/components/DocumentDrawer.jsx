const DocumentDrawer = ({ document, onClose }) => {
  if (!document) return null;

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
        <h5 className="mb-0">{document.name}</h5>
        <button className="btn-close" onClick={onClose}></button>
      </div>

      <p><strong>Autor:</strong> {document.author}</p>
      <p><strong>Categoría:</strong> {document.category}</p>
      <p><strong>Formato:</strong> {document.format}</p>

      <hr />

      <p style={{ whiteSpace: "pre-wrap" }}>{document.content}</p>
    </div>
  );
};

export default DocumentDrawer;