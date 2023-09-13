import axios from 'axios';

const EmployeeService = {
  getDepartments: async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/departamentos');
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

export default EmployeeService;
