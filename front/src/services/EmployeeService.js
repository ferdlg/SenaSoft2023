import axios from 'axios';

const EmployeeService = {
  getDepartments: async () => {
    try {
      const response = await axios.get('https://api-colombia.com/api/v1/Department');
      const data = response.data;
      const departamentosConId = data.map((dep) => ({ id: dep.id, name: dep.name }));
      return departamentosConId;
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
