import { useState } from "react";

const UploadForm = () => {
  const [file, setFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) return;
    console.log("Archivo seleccionado:", file);
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
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>

        {file && (
          <p className="text-success mb-3">Archivo: {file.name}</p>
        )}

        <button type="submit" className="btn btn-primary btn-lg w-100">
          Subir
        </button>
      </form>
    </div>
  );
};

export default UploadForm;