import executeQuery from "../../config/db.js";

class ClientDal {
  getClientsData = async() => {
    try {
      let sql = "SELECT * FROM client";
      let result = await executeQuery(sql);
      return result;
    } catch (error) {
      console.error(error);
      throw { message: "Error en base de datos" };
    }
  }

  findClientByEmail = async(email) => {
    try {
      const sql = "SELECT * FROM client WHERE email = ?";
      const result = await executeQuery(sql, [email]);
      return result;
    } catch (error) {
      throw { message: "Error en base de datos" };
    }
  }

  addClient = async(data) => {
    try {
      const sql = `
        INSERT INTO client (name, lastname, email, phone_number, company)
        VALUES (?, ?, ?, ?, ?)
      `;
      const result = await executeQuery(sql, data);
      return result;
    } catch (error) {
      throw { message: "Error en base de datos" };
    }
  }
}

export default new ClientDal();