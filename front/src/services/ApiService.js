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
      console.error("Error al cargar empleados: "+ error)
      throw error;
    }
  },

  getDepartments: async () => {
    try {
      const response = await axios.get('departamentos/');
      const data = response.data.departamentos;
      
      // Verifica que data sea un array antes de usar map
      if (Array.isArray(data)) {
        const departamentosConId = data.map((dep) => ({ id: dep.id, Departamento: dep.Departamento }));
        
        return departamentosConId;
      } else {
        console.error("El servidor no devolvió un array de departamentos:", data);
        throw new Error("Respuesta del servidor no válida");
      }
    } catch (error) {
      console.error("Error al cargar departamentos:", error);
      throw error;
    }
  },

  getCitiesByDepartmentId: async (departmentId) => {
    try {
      const response = await axios.get(`https://api-colombia.com/api/v1/Department/${departmentId}/cities`);
      const data = response.data;
      return data;
    } catch (error) {
      console.error("Error al cargar ciudades:", error);
      throw error;
    }
  },
};

export default ApiService;
