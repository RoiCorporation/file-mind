import { useState } from "react";

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState("UNKNOWN");
  const [extension, setExtension] = useState("");

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;

    setFile(selected);

    // Detectar extensión
    const ext = selected.name.split(".").pop().toLowerCase();
    setExtension(ext);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) return;

    const format = extension ? extension.toUpperCase() : "UNKNOWN";

    console.log({
      file,
      category,
      format
    });
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light p-3">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-5 rounded-4 shadow-lg text-center w-100"
        style={{ maxWidth: "600px" }}
      >
        <h2 className="mb-4 fw-bold text-primary">Subir archivo</h2>

        <div className="mb-4">
          <input
            type="file"
            className="form-control form-control-lg"
            onChange={handleFileChange}
          />
        </div>

        {file && (
          <>
            <p className="text-success mb-2">Archivo: {file.name}</p>
            <p className="text-muted small mb-3">
              Extensión detectada: .{extension}
            </p>
          </>
        )}

        <div className="mb-4">
          <select
            className="form-select form-select-lg"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Legal">Legal</option>
            <option value="Finance">Finanzas</option>
            <option value="Report">Informe</option>
            <option value="Unknown">N/A</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary btn-lg w-100">
          Subir
        </button>
      </form>
    </div>
  );
};

export default UploadForm;