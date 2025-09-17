import { useState } from "react"
import { Form } from "react-bootstrap";
import { validateForms } from "../../helpers/validateForms";
import { fetchData } from "../../helpers/axiosHelper";
import { clientSchema } from "../../schemas/addClientSchema";

const initialValues = {
  name: "",
  lastname: "",
  email: "",
  phone_number: "",
  company: ""
}

export const ClientForm = ({setClients, setShowForm}) => {
  const [register, setRegister] = useState(initialValues);
  const [valErrors, setValErrors] = useState({});
  const [msgError, setMsgError] = useState();

  const handleChange = (e) => {
    const {name, value} = e.target;
    setRegister({...register, [name]: value});
  }

  const onSubmit = async() => {
    try {
      const { valid, errors } = validateForms(clientSchema, register);
      setValErrors(errors);
      
      if (valid) {
        const res = await fetchData("/api/clients/addClient", "post", register);
        setClients((prev) => [...prev, res.data]);
        setShowForm(false);
        setRegister(initialValues);
      }

    } catch (error) {
      console.log(error);
      setMsgError(error?.response?.data || "Error inesperado en el servidor");
    }
  }

  return (
    <Form className="border border-2 rounded-4 p-3 bg-light">
      <Form.Group className="mb-3" controlId="formName">
        <Form.Label className="fw-bold">Nombre:</Form.Label>
        <Form.Control
          type="text"
          placeholder="Nombre"
          name="name"
          value={register.name}
          onChange={handleChange}
        />
        {valErrors.name && <Form.Text className="text-danger fw-bold">{valErrors.name}</Form.Text>}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formLastname">
        <Form.Label className="fw-bold">Apellidos:</Form.Label>
        <Form.Control
          type="text"
          placeholder="Apellidos"
          name="lastname"
          value={register.lastname}
          onChange={handleChange}
        />
        {valErrors.lastname && <Form.Text className="text-danger fw-bold">{valErrors.lastname}</Form.Text>}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formEmail">
        <Form.Label className="fw-bold">Email:</Form.Label>
        <Form.Control
          type="email"
          placeholder="ejemplo@correo.com"
          name="email"
          value={register.email}
          onChange={handleChange}
        />
        {valErrors.email && <Form.Text className="text-danger fw-bold">{valErrors.email}</Form.Text>}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formPhone">
        <Form.Label className="fw-bold">Teléfono:</Form.Label>
        <Form.Control
          type="text"
          placeholder="123456789"
          name="phone_number"
          value={register.phone_number}
          onChange={handleChange}
        />
        {valErrors.phone_number && <Form.Text className="text-danger fw-bold">{valErrors.phone_number}</Form.Text>}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formCompany">
        <Form.Label className="fw-bold">Empresa (opcional):</Form.Label>
        <Form.Control
          type="text"
          placeholder="Empresa"
          name="company"
          value={register.company}
          onChange={handleChange}
        />
        {valErrors.company && <Form.Text className="text-danger fw-bold">{valErrors.company}</Form.Text>}
      </Form.Group>
      
      {msgError && <p className="text-danger">{msgError.message || msgError}</p>}
      <div className="w-100">
        <button
          className="ppal-btn w-100"
          onClick={onSubmit}
          type="button"
        >Aceptar</button>
      </div>
    </Form>
  )
}
