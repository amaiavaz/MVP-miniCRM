import { useState } from "react";
import { Form } from "react-bootstrap";
import { fetchData } from "../../helpers/axiosHelper";
import { validateForms } from "../../helpers/validateForms";
import { opportunitySchema } from "../../schemas/addOpportunitySchema";

const initialValues = {
  title: "",
  amount: "",
  status: 1
};

export const OpportunityForm = ({ clientId, setOpportunities, setShowForm }) => {
  const [register, setRegister] = useState(initialValues);
  const [valErrors, setValErrors] = useState({});
  const [msgError, setMsgError] = useState();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegister({
      ...register,
      [name]: name === "status" ? Number(value) : value
    });
  }

  const onSubmit = async () => {
    try {
      const { valid, errors } = validateForms(opportunitySchema, register);
      setValErrors(errors);

      if (valid) {
        const payload = { ...register, client_id: clientId };
        const res = await fetchData("/api/opportunities/addOpportunity", "post", payload);
        setOpportunities(prev => [...prev, res.data]);
  
        setRegister(initialValues);
        setShowForm(false);
      }
    } catch (error) {
      console.log(error);
      setMsgError(error?.response?.data || "Error inesperado en el servidor");
    }
  }

  return (
    <Form className="border border-2 rounded-4 p-3 bg-light">
      <Form.Group className="mb-3" controlId="formTitle">
        <Form.Label className="fw-bold">Título:</Form.Label>
        <Form.Control
          type="text"
          placeholder="Nombre de la oportunidad"
          name="title"
          value={register.title}
          onChange={handleChange}
        />
        {valErrors.title && <Form.Text className="text-danger fw-bold">{valErrors.title}</Form.Text>}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formAmount">
        <Form.Label className="fw-bold">Monto:</Form.Label>
        <Form.Control
          type="text"
          placeholder="0.00"
          name="amount"
          value={register.amount}
          onChange={handleChange}
        />
        {valErrors.amount && <Form.Text className="text-danger fw-bold">{valErrors.amount}</Form.Text>}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formStatus">
        <Form.Label className="fw-bold">Estado:</Form.Label>
        <Form.Select
          name="status"
          value={register.status}
          onChange={handleChange}
        >
          <option value={1}>Nueva</option>
          <option value={2}>En proceso</option>
          <option value={3}>Cerrada</option>
        </Form.Select>
        {valErrors.status && <Form.Text className="text-danger fw-bold">{valErrors.status}</Form.Text>}
      </Form.Group>

      {msgError && <p className="text-danger">{msgError.message || msgError}</p>}
      <div className="w-100">
        <button
          className="ppal-btn w-100"
          type="button"
          onClick={onSubmit}
        >Aceptar</button>
      </div>
    </Form>
  );
};
