import axios from 'axios';

const url = 'http://127.0.0.1:8000/api/';

const ApiService = {
  
  getEmployees: async () => {
    try {
      const urlEmployees = url+'empleados/';
      const response = await axios.get(urlEmployees);
      const data = response.data;
      return data.empleados;
    } catch (error) {
      console.error("API: Error al cargar empleados: "+ error)
      throw error;
    }
  },

  getTipoDoc: async () => {
    try {
      const urlTipoDoc = url+'Tipo_documento/';
      const response = await axios.get(urlTipoDoc);
      const data = response.data;
      return data['Tipo de documentos'];
    } catch (error) {
      console.error("API: Error al cargar empleados: "+ error)
      throw error;
    }
  },

  getDepartments: async () => {
    try {
      const urlDepartamentos = url+'departamentos/';
      const response = await axios.get(urlDepartamentos);
      const data = response.data;
      return data.departamentos;
    } catch (error) {
      console.error("API: Error al cargar departamentos:", error);
      throw error;
    }
  },

  getCitiesByDepartmentId: async (departmentId) => {
    try {
      const urlCiudades = url+'filtro/'+departmentId+'/';
      const response = await axios.get(urlCiudades);
      const data = response.data;
      return data.ciudades;
    } catch (error) {
      console.error("API: Error al cargar ciudades:", error);
      throw error;
    }
  },
};

export default ApiService;
