import React, { useState } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Button } from '@mui/material';
import "./index.css"

const TableEmployes = ({ employees }) => {

  // Estado local para los filtros de busqueda
  const [searchFilters, setSearchFilters] = useState({
    Nombres: "",
    Apellidos: "",
    TipoDoc: "",
    NumDoc: "",
    Departamento: ""
  });

  // Manejar los cambios en los campos de busqueda
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    // actualiza el estado searchFilters con el nuevo valor, manteniendo los valores anteriores intactos.
    setSearchFilters({
      ...searchFilters,
      [name]: value
    });
  };


// Paginación
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // Opciones
  
  // Para opciones de la tabla
  const handleEditEmployee = (employeeId) => {
    // Implementa la lógica para editar el empleado con el ID proporcionado
    console.log("Edit")
  };
  
  const handleViewEmployee = (employeeId) => {
    // Implementa la lógica para ver los detalles del empleado con el ID proporcionado
  };
  
  const handleDeleteEmployee = (employeeId) => {
    // Implementa la lógica para eliminar el empleado con el ID proporcionado
  };

  // Filtra los empleados basados en los criterios de búsqueda
const filteredEmployes = employees.filter((employee) => {
  // Se convierte a minúscula la información de cada empleado para que se pueda realizar la busqueda sin sensibilidad a Mayúsculas/Minúsculas
  // Si no existe se deja vacio
  const Nombres = employee.Nombres ? employee.Nombres.toLowerCase() : "";
  const Apellidos = employee.Apellidos ? employee.Apellidos.toLowerCase() : "";
  const TipoDoc = employee.TipoDoc ? employee.TipoDoc.toLowerCase() : "";
  const NumDoc = employee.NumDoc ? employee.NumDoc.toLowerCase() : "";
  const Departamento = employee.Departamento ? employee.Departamento.toLowerCase() : "";

  // Se hace lo mismo con el texto ingresado en los filtros
  const filterNombres = searchFilters.Nombres.toLowerCase();
  const filterApellidos = searchFilters.Apellidos.toLowerCase();
  const filterTipoDoc = searchFilters.TipoDoc.toLowerCase();
  const filterNumDoc = searchFilters.NumDoc.toLowerCase();
  const filterDepartamento = searchFilters.Departamento.toLowerCase();

  return (
    // Se retorna siempre y cuando se cumplan todas las busquedas
    Nombres.includes(filterNombres) &&
    Apellidos.includes(filterApellidos) &&
    TipoDoc.includes(filterTipoDoc) &&
    NumDoc.includes(filterNumDoc) &&
    Departamento.includes(filterDepartamento)
  )  
});
const columns = [
  {id: 'Nombres', label: 'Nombres', minWidth: 100, align: 'center', format: ''},
  {id: 'Apellidos', label: 'Apellidos', minWidth: 170, align: 'center', format: ''},
  {id: 'TipoDoc', label: 'TipoDoc', minWidth: 170, align: 'center', format: ''},
  {id: 'NumDoc', label: 'NumDoc', minWidth: 170, align: 'center', format: ''},
  {id: 'Departamento', label: 'Departamento', minWidth: 170, align: 'center', format: ''},
  {id: 'Acciones', label: 'Acciones', minWidth: 100, align: 'center', format: '' },
]
const rows = filteredEmployes.map((employee) => ({
  ...employee,
  Acciones: (
    <div className='OpcionesTable'> 
      <Button color='secondary' onClick={() => handleEditEmployee(employee.NumDoc)}>
        Editar
      </Button>
      <Button color='secondary' onClick={() => handleViewEmployee(employee.NumDoc)}>
        Ver
      </Button>
      <Button color='secondary' onClick={() => handleDeleteEmployee(employee.NumDoc)}>
        Eliminar
      </Button>
    </div>
  ),
}));

return (
  
  <Paper sx={{ width: '100%', overflow: 'hidden' }}>
    
    <TableContainer sx={{ maxHeight: 360 }}>
      <Table stickyHeader aria-label="sticky table">
      <TableHead>
        <TableRow>
        <TableCell>
          <div className="tableHead">
            <strong className='cl_moradoOscuro'>
              Nombres
            </strong>
            <input
              type="text"
              name="Nombres"
              value={searchFilters.Nombres}
              onChange={handleFilterChange}
              placeholder="Buscar"
            />
          </div>
        </TableCell>
        <TableCell>
          <div className="tableHead">
          <strong className='cl_moradoOscuro'>
              Apellidos
            </strong>
            <input
              type="text"
              name="Apellidos"
              value={searchFilters.Apellidos}
              onChange={handleFilterChange}
              placeholder="Buscar"
            />
          </div>
        </TableCell>
        <TableCell>
          <div className="tableHead">
          <strong className='cl_moradoOscuro'>
              Tipo Documento
            </strong>
            <input
              type="text"
              name="TipoDoc"
              value={searchFilters.TipoDoc}
              onChange={handleFilterChange}
              placeholder="Buscar"
            />
          </div>
        </TableCell>
        <TableCell>
          <div className="tableHead">
          <strong className='cl_moradoOscuro'>
              Número Documento
            </strong>
            <input
              type="text"
              name="NumDoc"
              value={searchFilters.NumDoc}
              onChange={handleFilterChange}
              placeholder="Buscar"
            />
          </div>
        </TableCell>
        <TableCell>
          <div className="tableHead">
          <strong className='cl_moradoOscuro'>
              Departamento
            </strong>
            <input
              type="text"
              name="Departamento"
              value={searchFilters.Departamento}
              onChange={handleFilterChange}
              placeholder="Buscar"
            />
          </div>
        </TableCell>
        <TableCell>
          <strong className='OpcionesTable cl_moradoOscuro'> 
            Opciones  
          </strong>
        </TableCell>
            </TableRow>
        </TableHead>

        <TableBody>
        {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
        </TableBody>
      </Table>
    </TableContainer>
    <TablePagination
      rowsPerPageOptions={[10, 25, 100]}
      component="div"
      count={rows.length}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  </Paper>
);

}

export default TableEmployes;
