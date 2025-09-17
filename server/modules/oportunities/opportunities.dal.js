import executeQuery from '../../config/db.js';

class OpportunitiesDal {
  getOpportunitiesByClient = async (clientId) => {
    try {
      const sql = 'SELECT * FROM opportunity WHERE client_id = ?';
      const result = await executeQuery(sql, [clientId]);
      return result;
    } catch (error) {
      throw { message: 'Error en base de datos' };
    }
  }

  addOpportunity = async (data) => {
    try {
      const sql = `
        INSERT INTO opportunity (title, amount, status, client_id)
        VALUES (?, ?, ?, ?)
      `;
      const result = await executeQuery(sql, data);
      return result;
    } catch (error) {
      throw { message: 'Error en base de datos' };
    }
  }
}

export default new OpportunitiesDal();
