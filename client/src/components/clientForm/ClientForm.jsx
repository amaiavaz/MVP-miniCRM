import { useState } from "react"
import { Form } from "react-bootstrap";

const initialValues = {
  name: "",
  lastname: "",
  email: "",
  phone_number: "",
  company: ""
}

export const ClientForm = () => {
  const [register, setRegister] = useState(initialValues);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setRegister({...register, [name]: value});
  }

  const onSubmit = () => {

  }

  return (
    <Form className="border border-2 rounded-4 p-3">
      <Form.Group className="mb-3" controlId="formName">
        <Form.Label className="fw-bold">Nombre:</Form.Label>
        <Form.Control
          type="text"
          placeholder="Nombre"
          name="name"
          value={register.name}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formLastname">
        <Form.Label className="fw-bold">Apellido:</Form.Label>
        <Form.Control
          type="text"
          placeholder="Apellido"
          name="lastname"
          value={register.lastname}
          onChange={handleChange}
        />
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
      </Form.Group>
      
      {/* {msgError && <p className="text-danger">{msgError}</p>} */}
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
