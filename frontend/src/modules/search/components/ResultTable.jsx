const ResultTable = ({ results, onSelect }) => {

  const mockResults = [
    {
      id: 1,
      name: "Contrato Cliente ACME",
      author: "María López",
      category: "Legal",
      format: "pdf",
      content: "Contrato marco de prestación de servicios tecnológicos con cláusulas de confidencialidad, protección de datos, SLA y penalizaciones por incumplimiento..."
    },
    {
      id: 2,
      name: "Informe Técnico Infraestructura",
      author: "Carlos Ruiz",
      category: "IT",
      format: "pdf",
      content: "Análisis detallado del estado de los servidores, uso de CPU, memoria, almacenamiento y recomendaciones para escalabilidad horizontal..."
    },
    {
      id: 3,
      name: "Presupuesto Proyecto Web",
      author: "Laura Sánchez",
      category: "Ventas",
      format: "pdf",
      content: "Documento de presupuesto incluyendo costes de desarrollo frontend, backend, despliegue en cloud y mantenimiento anual..."
    },
    {
      id: 4,
      name: "Ficha Técnica Producto X200",
      author: "Departamento Técnico",
      category: "Producto",
      format: "pdf",
      content: "Especificaciones técnicas del modelo X200 incluyendo dimensiones, consumo energético, certificaciones y compatibilidad..."
    },
    {
      id: 5,
      name: "Acta Reunión Comité Dirección",
      author: "Secretaría",
      category: "Interno",
      format: "pdf",
      content: "Resumen de los puntos tratados en la reunión mensual del comité: estrategia Q3, revisión de KPIs y nuevas contrataciones..."
    },
    {
      id: 6,
      name: "Pedido Proveedor Hardware",
      author: "Compras",
      category: "Finanzas",
      format: "pdf",
      content: "Orden de compra de 50 unidades de portátiles, 20 monitores y 10 switches gestionables con condiciones de entrega y pago..."
    },
    {
      id: 7,
      name: "Informe Legal Protección Datos",
      author: "Asesoría Jurídica",
      category: "Legal",
      format: "pdf",
      content: "Evaluación del cumplimiento del RGPD en los procesos internos, análisis de riesgos y plan de acción correctivo..."
    },
    {
      id: 8,
      name: "Manual Interno Onboarding",
      author: "RRHH",
      category: "Recursos Humanos",
      format: "pdf",
      content: "Guía completa para la incorporación de nuevos empleados, incluyendo procesos administrativos y formación inicial..."
    },
    {
      id: 9,
      name: "Reporte Incidencia Seguridad",
      author: "Equipo SOC",
      category: "Seguridad",
      format: "pdf",
      content: "Descripción de la incidencia detectada en el firewall perimetral, análisis de logs y medidas de contención aplicadas..."
    },
    {
      id: 10,
      name: "Plan Estratégico 2026",
      author: "Dirección General",
      category: "Estrategia",
      format: "PDF",
      content: "Documento estratégico con visión a tres años, objetivos corporativos, expansión internacional y transformación digital..."
    }
  ];

  const data = results && results.length > 0 ? results : mockResults;

  const truncate = (text, max = 100) => {
    if (!text) return "";
    return text.length > max ? text.substring(0, max) + "..." : text;
  };

    return (
        <div className="container my-4">
        <div className="card shadow-sm">
            <div className="card-body p-0">
            <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">

                <thead className="table-light">
                    <tr>
                    <th>Nombre</th>
                    <th>Autor</th>
                    <th>Categoría</th>
                    <th>Formato</th>
                    <th>Contenido</th>
                    </tr>
                </thead>

                <tbody>
                    {data.map((doc) => (
                    <tr
                        key={doc.id}
                        style={{ cursor: "pointer" }}
                        onClick={() => onSelect?.(doc)}
                    >
                        <td>{doc.name}</td>
                        <td>{doc.author}</td>
                        <td>
                        <span className="badge bg-secondary">
                            {doc.category}
                        </span>
                        </td>
                        <td>{doc.format}</td>
                        <td className="text-muted">
                        {truncate(doc.content)}
                        </td>
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