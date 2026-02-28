import { useState } from "react";
import ResultTable from "../../search/components/ResultTable";
import SearchForm from "../../search/components/SearchForm";
import DocumentDrawer from "../../search/components/DocumentDrawer";

const Home = () => {
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [results, setResults] = useState([]); // <- estado para los resultados

  const isOpen = !!selectedDoc;

  return (
    <div className="d-flex">
      <div
        className="flex-grow-1"
        style={{
          transition: "all 0.3s ease",
          marginRight: isOpen ? "400px" : "0"
        }}
      >
        <SearchForm onSearch={setResults} />
        <ResultTable results={results} onSelect={setSelectedDoc} />
      </div>

      <DocumentDrawer
        document={selectedDoc}
        onClose={() => setSelectedDoc(null)}
      />
    </div>
  );
};

export default Home;