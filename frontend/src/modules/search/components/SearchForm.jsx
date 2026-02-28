import { useState } from "react";

const SearchForm = ({ onSearch }) => {

  const [query, setQuery] = useState("");
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
  const [sortBy, setSortBy] = useState("date");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch?.({ query, type, category, sortBy });
  };

  return (
    <form onSubmit={handleSubmit} className="card shadow-sm p-4 mb-4">

      <h5 className="mb-3">Buscar documentos</h5>

      <div className="row g-3">
        <div className="col-12">
          <div className="input-group">
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
          </div>
        </div>
        <div className="col-md-4">
          <select
            className="form-select"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="">Extensión del documento</option>
            <option value="pdf">.pdf</option>
            <option value="txt">.txt</option>
            <option value="csv">.csv</option>
            <option value="xlsx">.xlsx</option>
          </select>
        </div>
        <div className="col-md-4">
          <select
            className="form-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Categoría</option>
            <option value="legal">Legal</option>
            <option value="finance">Finanzas</option>
            <option value="sales">Ventas</option>
            <option value="operations">Operaciones</option>
          </select>
        </div>
        <div className="col-md-4">
          <select
            className="form-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="date">Ordenar por fecha</option>
            <option value="title">Ordenar por título</option>
          </select>
        </div>

      </div>
    </form>
  );
};

export default SearchForm;