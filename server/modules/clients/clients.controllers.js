import clientsDal from "./clients.dal";

class ClientController {
  getClientsData = async(req, res) => {
    try {
      const result = await clientsDal.getClientsData();
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({message: "Error de servidor"});
    }
  }
}

export default new ClientController();