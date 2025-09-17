import axios from 'axios';

const apiUrl = 'http://localhost:4000';

// función para peticiones al back
export const fetchData = async (url, method, data = null) => {
  const config = {
    method,
    url: apiUrl + url,
    data
  };

  try {
    const response = await axios(config);
    return response;
  } catch (error) {
    console.error('Error en la petición:', error);
    throw error;
  }
};