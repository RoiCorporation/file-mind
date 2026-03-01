import { useState } from "react";
import { useNavigate } from "react-router-dom";

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState("UNKNOWN");
  const [extension, setExtension] = useState("");
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;
    setFile(selected);
    setExtension(selected.name.split(".").pop().toLowerCase());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    const format = extension ? extension.toUpperCase() : "UNKNOWN";

    const formData = new FormData();
    formData.append("upload", file);
    formData.append("category", category);
    formData.append("format", format);

    try {
      const res = await fetch(`${API_BASE}/v1/files/import_file/?${params.toString()}`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
          const text = await res.text();
          console.error("Upload failed:", res.status, res.statusText, text);
          throw new Error(`Error al subir (${res.status})`);
      }
      await res.json();

      setShowToast(true); // mostramos el popup

      // cerrarlo y redirigir tras 2s
      setTimeout(() => {
        setShowToast(false);
        navigate("/");
      }, 2000);
    } catch (err) {
      console.error(err);
      alert("Error al subir el fichero");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light p-3">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-5 rounded-4 shadow-lg text-center w-100"
        style={{ maxWidth: "600px" }}
      >
        <h2 className="mb-4 fw-bold text-primary">Subir archivo</h2>

        <input type="file" className="form-control form-control-lg mb-3" onChange={handleFileChange} />

        {file && (
          <>
            <p className="text-success mb-2">Archivo: {file.name}</p>
            <p className="text-muted small mb-3">Extensión detectada: .{extension}</p>
          </>
        )}

        <select
          className="form-select form-select-lg mb-4"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="Legal">Legal</option>
          <option value="Finance">Finanzas</option>
          <option value="Report">Informe</option>
          <option value="Certificate">Certificado</option>
          <option value="Unknown">N/A</option>
        </select>

        <button type="submit" className="btn btn-primary btn-lg w-100">Subir</button>
      </form>

      {/* Toast popup */}
      {showToast && (
        <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 1100 }}>
          <div className="toast show align-items-center text-bg-success border-0">
            <div className="d-flex">
              <div className="toast-body">Archivo subido correctamente ✅</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadForm;