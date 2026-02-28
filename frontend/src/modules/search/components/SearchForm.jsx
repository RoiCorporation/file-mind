import { useState, useEffect } from "react";

const SearchForm = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [showFilters, setShowFilters] = useState(false);

  // Función que hace la búsqueda con filtros opcionales
  const fetchData = async (filters = {}) => {
    const params = new URLSearchParams();
    if (filters.query) params.append("name", filters.query);
    if (filters.category) params.append("category", filters.category);
    if (filters.type) params.append("format", filters.type);
    if (filters.sortBy) params.append("orderBy", filters.sortBy);

    try {
      const res = await fetch(
        `http://localhost:8000/api/v1/files/search_files?${params.toString()}`
      );
      const data = await res.json();
      onSearch?.(data);
    } catch (err) {
      console.error("Error buscando documentos:", err);
      onSearch?.([]);
    }
  };

  // Ejecutar la primera vez al montar (sin filtros)
  useEffect(() => {
    fetchData({sortBy: "name"}); 
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData({ query, category, type, sortBy });
  };

  return (
    <div className="container my-4">
      <form onSubmit={handleSubmit} className="card shadow-sm p-4">
        <h5 className="mb-3">Buscar documentos</h5>

        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar por palabra clave, título, contenido..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="btn btn-primary" type="submit">
            Buscar
          </button>
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => setShowFilters(!showFilters)}
          >
            {showFilters ? "Ocultar filtros" : "Más filtros"}
          </button>
        </div>

        {showFilters && (
          <div className="row g-3 mt-2">
            <div className="col-md-4">
              <label className="form-label fw-semibold">Formato de archivo</label>
              <select
                className="form-select"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="">Selecciona formato</option>
                <option value="PDF">.pdf</option>
                <option value="TXT">.txt</option>
                <option value="CSV">.csv</option>
                <option value="XLSX">.xlsx</option>
                <option value="DOCX">.docx</option>
                <option value="ODS">.ods</option>
                <option value="ODT">.odt</option>
                <option value="PNG">.png</option>
                <option value="JPG">.jpg</option>
                <option value="JPEG">.jpeg</option>
              </select>
            </div>

            <div className="col-md-4">
              <label className="form-label fw-semibold">Categoría</label>
              <select
                className="form-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Selecciona categoría</option>
                <option value="Legal">Legal</option>
                <option value="Finance">Finanzas</option>
                <option value="Report">Informe</option>
                <option value="Certificate">Certificado</option>
                <option value="Unknown">N/A</option>
              </select>
            </div>

            <div className="col-md-4">
              <label className="form-label fw-semibold">Ordenar por</label>
              <select
                className="form-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="name">Título</option>
                <option value="format">Formato</option>
                <option value="author">Autor</option>
                <option value="category">Categoría</option>
              </select>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default SearchForm;