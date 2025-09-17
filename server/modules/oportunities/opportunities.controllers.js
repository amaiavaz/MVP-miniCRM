import opportunitiesDal from './opportunities.dal.js';
import { Parser } from 'json2csv';

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

  exportOpportunities = async (req, res) => {
    try {
      const opportunities = await opportunitiesDal.getOpportunitiesData();
      const fields = ['opportunity_id', 'title', 'amount', 'status', 'client_id'];
      const parser = new Parser({ fields });
      const csv = parser.parse(opportunities);

      res.header('Content-Type', 'text/csv');
      res.attachment('opportunities.csv');
      res.send(csv);

    } catch (error) {
      res.status(500).json({ message: 'Error de servidor' });
    }
  }
}

export default new OpportunitiesController();
