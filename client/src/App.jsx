import './App.css';
import { Col, Container, Row } from 'react-bootstrap';
import { ClientForm } from './components/clientForm/ClientForm';
import { ClientDetail } from './components/clientDetail/ClientDetail';
import { useEffect, useState } from 'react';
import { CustomTable } from './components/table/CustomTable';
import { fetchData } from './helpers/axiosHelper';
import { ExportButtons } from './components/exportButtons/ExportButtons';

function App() {
  const [clients, setClients] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);

  useEffect(() => {
    const fetchClients = async() => {
      try {
        const res = await fetchData("/api/clients", "get");
        setClients(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchClients();
  }, []);

  const handleShowForm = () => {
    setShowForm(!showForm);
  }

  //datos para pasar al componente table
  // la key debe llamarse como el campo de la base de datos para que la identifique y la rellene con los datos que llegan
  //label es el nombre que recibe el "titulo" de cada columna
  const columns = [
    { key: "name", label: "Nombre" },
    { key: "lastname", label: "Apellidos" },
    { key: "email", label: "Email" },
    { key: "phone_number", label: "Teléfono" },
    { key: "company", label: "Empresa" },
    {
      key: "actions",
      label: "Acciones",
      render: (row) => (
        <button className="sec-btn" onClick={() => setSelectedClient(row)}>
          Ver
        </button>
      )
    }
  ];

  return (
    <>
      <main className='overflow-hidden'>
        <h1 className='text-center mb-5 py-3 bg-dark text-white'>MVP - CRM</h1>
        <Container fluid>
          {!selectedClient ? 
            <Row className='gx-5 gy-4'>
              <Col lg={8}>
                <ExportButtons />
                {/* tabla customizada para datos de clientes */}
                <CustomTable
                  columns={columns}
                  data={clients}
                />
              </Col>

              <Col lg={4}>
                <div className='text-center mb-5'>
                  <button
                    className='ppal-btn'
                    onClick={handleShowForm}
                  >Crear cliente</button>
                </div>
                {showForm && 
                  <ClientForm
                    setClients={setClients}
                    setShowForm={setShowForm}
                  />
                }
              </Col>
            </Row>
            :
            <ClientDetail
              client={selectedClient}
              onBack={() => setSelectedClient(null)}
            />
          }
        </Container>
      </main>
    </>
  )
}

export default App;
