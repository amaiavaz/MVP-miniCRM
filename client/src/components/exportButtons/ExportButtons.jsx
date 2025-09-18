import { fetchData } from "../../helpers/axiosHelper";

export const ExportButtons = () => {
  const handleExport = async (endpoint) => {
    try {
      const res = await fetchData(endpoint, "get", null, { responseType: "blob" });
      //crea un objeto URL temporal para descargar el archivo en el navegador
      const url = window.URL.createObjectURL(new Blob([res.data]));
      //crea un enlace <a> invisible para forzar la descarga
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", endpoint.includes("clients") ? "clients.csv" : "opportunities.csv");
      //añade el enlace al DOM, hacemos click y luego se elimna
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="d-flex gap-3">
      <button
        className="ppal-btn" 
        onClick={() => handleExport('/api/clients/export')}
      >Exportar Clientes</button>
      <button
        className="ppal-btn"
        onClick={() => handleExport('/api/opportunities/export')}
      >Exportar Oportunidades</button>
    </div>
  )
}
