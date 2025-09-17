import opportunitiesDal from './opportunities.dal.js';

class OpportunitiesController {
  getOpportunitiesByClient = async (req, res) => {
    try {
      const { clientId } = req.params;
      const result = await opportunitiesDal.getOpportunitiesByClient(clientId);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: 'Error de servidor' });
    }
  }

  addOpportunity = async (req, res) => {
    try {
      const { title, amount, status, client_id } = req.body;

      const data = [title, amount, status, client_id];
      const insertResult = await opportunitiesDal.addOpportunity(data);

      const newOpportunity = {
        opportunity_id: insertResult.lastID,
        title,
        amount,
        status,
        client_id
      };

      res.status(200).json(newOpportunity);
    } catch (error) {
      res.status(500).json({ message: 'Error de servidor' });
    }
  }
}

export default new OpportunitiesController();
