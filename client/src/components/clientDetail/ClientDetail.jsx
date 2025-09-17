import { Col, Row } from "react-bootstrap";
import { CustomTable } from "../table/CustomTable";
import { OpportunityForm } from "../opportunityForm/OpportunityForm";
import { useEffect, useState } from "react";
import { fetchData } from "../../helpers/axiosHelper";

export const ClientDetail = ({ client, onBack }) => {
  const [opportunities, setOpportunities] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchOpportunities = async () => {
      try {
        const res = await fetchData(`/api/opportunities/${client.client_id}`, 'get');
        setOpportunities(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchOpportunities();
  }, [client.client_id]);

  const handleShowForm = () => {
    setShowForm(!showForm);
  }

  const columns = [
    { key: 'title', label: 'Título' },
    { key: 'amount', label: 'Monto' },
    { key: 'status', label: 'Estado' },
  ];

  return (
    <>
      <div className="text-center my-4">
        <button
          className="ppal-btn"
          onClick={onBack}
        >Volver a clientes</button>
      </div>
      <div className="p-3 mx-auto mb-4 text-center border border-2 border-black rounded-4 w-50 shadow bg-light">
        <h2 className="fs-3">{client.name} {client.lastname}</h2>
        <h3 className="fs-5">Email: {client.email} | Tel: {client.phone_number} | Empresa: {client.company || '-'}</h3>
      </div>

      <Row className="justify-content-between">
        <Col md={6}>
          <CustomTable 
            data={opportunities}
            columns={columns} 
          />
        </Col>
        <Col md={4}>
          <div className='text-center mb-3'>
            <button
              className='ppal-btn mt-5'
              onClick={handleShowForm}
            >Crear oportunidad</button>
          </div>
          {showForm && 
            <OpportunityForm 
              clientId={client.client_id}
              setOpportunities={setOpportunities}
              setShowForm={setShowForm}
            />
          }
        </Col>
      </Row>
    </>
  );
};
