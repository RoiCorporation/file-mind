const ResultTable = ({ results, onSelect }) => {
  if (!results || results.length === 0) return null;

  // truncamos antes de renderizar en tabla
  const truncate = (text, max = 80) => {
    if (!text) return "";
    return text.length > max ? text.substring(0, max) + "..." : text;
  };


  const parsePdfDate = (pdfDate) => {
    if (!pdfDate) return "—";
    const match = pdfDate.match(/^D:(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/);
    if (!match) return pdfDate; // si no coincide, devolvemos crudo
    const [, year, month, day, hour, minute, second] = match;
    return `${day}/${month}/${year} ${hour}:${minute}`;
  };

  return (
    <div className="container my-4">
      <div className="card shadow-sm">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th>Título</th>
                  <th>Autor</th>
                  <th>Categoría</th>
                  <th>Formato</th>
                  <th>Fecha creación</th>
                  <th>Contenido</th>
                </tr>
              </thead>
              <tbody>
                {(Array.isArray(results) ? results : []).map((doc, idx) => (
                  <tr
                    key={idx}
                    style={{ cursor: "pointer" }}
                    onClick={() => onSelect?.(doc)}
                  >
                    <td>{doc.name}</td>
                    <td>{doc.author}</td>
                    <td>
                      <span className="badge bg-secondary">{doc.category}</span>
                    </td>
                    <td>{doc.format}</td>
                    <td>{parsePdfDate(doc.file_metadata?.creationdate)}</td>
                    <td className="text-muted">{truncate(doc.content)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultTable;