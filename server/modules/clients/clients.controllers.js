import clientsDal from "./clients.dal.js";
import { Parser } from 'json2csv';

class ClientController {
  getClientsData = async(req, res) => {
    try {
      const result = await clientsDal.getClientsData();
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({message: "Error de servidor"});
    }
  }
  
  addClient = async(req, res) => {
    try {
      const { name, lastname, email, phone_number, company } = req.body;

      //verificación de que el email no esté registrado
      const existing = await clientsDal.findClientByEmail(email);
      if (existing.length !== 0) {
        return res.status(400).json({ message: "Este email ya está registrado" });
      }

      //insertar cliente en bd
      const data = [name, lastname, email, phone_number, company];
      const insertResult = await clientsDal.addClient(data);

      //objeto para enviar al front
      const newClient = {
        user_id: insertResult.lastID,
        name,
        lastname,
        email,
        phone_number,
        company
      };
      res.status(200).json(newClient);
    } catch (error) {
      res.status(500).json({message: "Error de servidor"});
    }
  }

  exportClients = async (req, res) => {
    try {
      const clients = await clientsDal.getClientsData();
      
      // Opción CSV
      const fields = ['client_id', 'name', 'lastname', 'email', 'phone_number', 'company'];
      const parser = new Parser({ fields });
      const csv = parser.parse(clients);

      res.header('Content-Type', 'text/csv');
      res.attachment('clients.csv');
      res.send(csv);

    } catch (error) {
      res.status(500).json({ message: 'Error de servidor' });
    }
  }
}

export default new ClientController();