import './App.css';
import { Col, Container, Row } from 'react-bootstrap';
import { ClientList } from './components/clientList/ClientList';
import { ClientForm } from './components/clientForm/ClientForm';
import { ClientDetail } from './components/clientDetail/ClientDetail';
import { useEffect, useState } from 'react';
import { CustomTable } from './components/table/CustomTable';
import { fetchData } from './helpers/axiosHelper';

function App() {
  const [clients, setClients] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);

  useEffect(() => {
    const fetchClients = async() => {
      try {
        const res = await fetchData("/clients/clients", "get");
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
      <main>
        <Container>
          <h1>MVP de CRM</h1>
          {!selectedClient ? 
            <Row>
              <Col md={8}>
                {/* tabla customizada para datos de clientes */}
                <CustomTable
                  columns={columns}
                  data={clients}
                />
              </Col>

              <Col md={4}>
                <div className='text-center mb-3'>
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
            <ClientDetail />
          }
        </Container>
      </main>
    </>
  )
}

export default App;
