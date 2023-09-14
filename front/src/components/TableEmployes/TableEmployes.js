import React, { useState } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Button } from '@mui/material';
import "./index.css"

const TableEmployes = ({ employes }) => {
  
  // Estado local para los filtros de busqueda
  const [searchFilters, setSearchFilters] = useState({
    nombres_empleado: "",
    apellidos_empleado: "",
    id_tipo_documento_fk_id: "",
    numero_documento: "",
    id_departamento_fk_id: ""
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

// Filtra los empleados basados en los criterios de búsqueda
const filteredEmployes = employes.filter((employe) => {
  // Convierte los valores a texto y asegúrate de que no sean null ni undefined
  const nombres_empleado = employe.nombres_empleado ? employe.nombres_empleado.toString().toLowerCase() : "";
  const apellidos_empleado = employe.apellidos_empleado ? employe.apellidos_empleado.toString().toLowerCase() : "";
  const id_tipo_documento_fk_id = employe.tipo_documento.nombre_tipo_documento ? employe.tipo_documento.nombre_tipo_documento.toString().toLowerCase() : "";
  const numero_documento = employe.numero_documento ? employe.numero_documento.toString().toLowerCase() : "";
  const id_departamento_fk_id = employe.departamento.nombre_departamento ? employe.departamento.nombre_departamento.toString().toLowerCase() : "";

  // Convierte los valores de los filtros a texto y asegúrate de que no sean null ni undefined
  const filter_nombres_empleado = searchFilters.nombres_empleado ? searchFilters.nombres_empleado.toString().toLowerCase() : "";
  const filter_apellidos_empleado = searchFilters.apellidos_empleado ? searchFilters.apellidos_empleado.toString().toLowerCase() : "";
  const filter_id_tipo_documento_fk_id = searchFilters.id_tipo_documento_fk_id ? searchFilters.id_tipo_documento_fk_id.toString().toLowerCase() : "";
  const filter_numero_documento = searchFilters.numero_documento ? searchFilters.numero_documento.toString().toLowerCase() : "";
  const filter_id_departamento_fk_id = searchFilters.id_departamento_fk_id ? searchFilters.id_departamento_fk_id.toString().toLowerCase() : "";

  return (
    // Se retorna siempre y cuando se cumplan todas las búsquedas
    nombres_empleado.includes(filter_nombres_empleado) &&
    apellidos_empleado.includes(filter_apellidos_empleado) &&
    id_tipo_documento_fk_id.includes(filter_id_tipo_documento_fk_id) &&
    numero_documento.includes(filter_numero_documento) &&
    id_departamento_fk_id.includes(filter_id_departamento_fk_id)
  );
});

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

const columns = [
  {id: 'nombres_empleado', label: 'Nombrnombres_empleadoes', minWidth: 100, align: 'center', format: ''},
  {id: 'apellidos_empleado', label: 'apellidos_empleado', minWidth: 170, align: 'center', format: ''},
  {id: 'tipo_documento.nombre_tipo_documento', label: 'tipo_documento.nombre_tipo_documento', minWidth: 170, align: 'center', format: ''},
  {id: 'numero_documento', label: 'numero_documento', minWidth: 170, align: 'center', format: ''},
  {id: 'departamento.nombre_departamento', label: 'departamento.nombre_departamento', minWidth: 170, align: 'center', format: ''},
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
