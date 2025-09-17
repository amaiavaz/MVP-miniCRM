import executeQuery from "../../config/db.js";

class ClientDal {
  getClientsData = async() => {
    try {
      let sql = "SELECT * FROM client";
      let result = await executeQuery(sql);
      return result;
    } catch (error) {
      throw { message: "Error en base de datos" };
    }
  }
}

export default new ClientDal();