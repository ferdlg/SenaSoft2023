import React, { useState, useEffect } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Button, TextField } from '@mui/material';
import './index.css';
import ApiService from '../../../../services/ApiService';
import { obtenerFecha } from '../../../../utilities';

const TableEmployes = ({ employes }) => {
  const [id_empleado, setId_empleado] = useState();
  const [numero_documento, setNumero_documento] = useState();
  const [nombres_empleado, setNombres_empleado] = useState();
  const [apellidos_empleado, setApellidos_empleado] = useState();
  const [ciudad, setCiudad] = useState();
  const [ciudades, setCiudades] = useState([]);
  const [direccion, setDireccion] = useState();
  const [email, setEmail] = useState();
  const [telefono, setTelefono] = useState();
  const [fecha_hora_crear, setFecha_hora_crear] = useState();
  const [fecha_hora_modificar, setFecha_hora_modificar] = useState();
  const [tipo_documento, setTipo_documento] = useState();
  const [tipo_documentos, setTipo_documentos] = useState([]);
  const [departamento, setDepartamento] = useState();
  const [departamentos, setDepartamentos] = useState([]);
  
  useEffect(() => {
    ApiService.getTipoDoc()
        .then((data) => {
          setTipo_documentos(data);
        })
        .catch((e) => {
            console.error('No fue posible cargar los tipos de documento. Error: ' + e);
        });

    ApiService.getDepartments()
        .then((data) => {
          setDepartamentos(data);
        })
        .catch((e) => {
            console.error('No fue posible cargar Departamentos. Error: ' + e);
        });
  }, []);

  const handleDepartamentoChange = (dep) => {
    ApiService.getCitiesByDepartmentId(dep)
      .then((data) => {
          setCiudades(data);
          console.log("Ciudades cargadas correctamente:", data);
      })
      .catch((e) => {
          console.error("No fue posible cargar las ciudades:", e);
      });
  };  

  const [searchFilters, setSearchFilters] = useState({
    nombres_empleado: '',
    apellidos_empleado: '',
    tipo_documento: '',
    numero_documento: '',
    departamento: '',
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setSearchFilters({
      ...searchFilters,
      [name]: value,
    });
  };

  const filteredEmployes = employes.filter((employe) => {
    const Nombres = employe.nombres_empleado ? employe.nombres_empleado.toLowerCase() : '';
    const Apellidos = employe.apellidos_empleado ? employe.apellidos_empleado.toLowerCase() : '';
    const TipoDoc = employe.tipo_documento?.nombre_tipo_documento ? employe.tipo_documento.nombre_tipo_documento.toLowerCase() : '';
    const NumDoc = employe.numero_documento ? employe.numero_documento.toString().toLowerCase() : '';
    const Departamento = employe.departamento?.nombre_departamento ? employe.departamento.nombre_departamento.toLowerCase() : '';
    
    const filter_Nombres = searchFilters.nombres_empleado.toLowerCase();
    const filter_Apellidos = searchFilters.apellidos_empleado.toLowerCase();
    const filter_TipoDoc = searchFilters.tipo_documento.toLowerCase();
    const filter_NumDoc = searchFilters.numero_documento.toLowerCase();
    const filter_Departamento = searchFilters.departamento.toLowerCase();

    return (
      Nombres.includes(filter_Nombres) &&
      Apellidos.includes(filter_Apellidos) &&
      TipoDoc.includes(filter_TipoDoc) &&
      NumDoc.includes(filter_NumDoc) &&
      Departamento.includes(filter_Departamento)
    );
  });

  const handleEditEmployee = (employeeId) => {
    console.log(`Editar empleado con ID ${employeeId}`);
  };

  const openModal = ( 
    option,
    id_empleado,
    numero_documento,
    nombres_empleado,
    apellidos_empleado,
    miCiudad,
    direccion,
    email,
    telefono,
    fecha_hora_crear,
    fecha_hora_modificar,
    tipo_documento,
    departamento
  ) => {
    if(option==1){
      setId_empleado("");
      setNumero_documento("");
      setNombres_empleado("");
      setApellidos_empleado("");
      setCiudad("");
      setDireccion("");
      setEmail("");
      setTelefono("");
      setFecha_hora_crear("");
      setFecha_hora_modificar("");
      setTipo_documento("");
      setDepartamento("");
    }else if(option==2){
      setId_empleado(id_empleado);
      setNumero_documento(numero_documento);
      setNombres_empleado(nombres_empleado);
      setApellidos_empleado(apellidos_empleado);
      setDireccion(direccion);
      setEmail(email);
      setTelefono(telefono);
      setFecha_hora_crear(fecha_hora_crear);
      setFecha_hora_modificar(fecha_hora_modificar);
      setTipo_documento(tipo_documento);
      setDepartamento(departamento);
      handleDepartamentoChange(departamento);
      setCiudad(miCiudad);
    }
  };

  const handleDeleteEmployee = (employeeId) => {
    console.log(`Eliminar empleado con ID ${employeeId}`);
  };

  const columns = [
    { id: 'nombres_empleado', label: 'Nombres', minWidth: 100, align: 'center' },
    { id: 'apellidos_empleado', label: 'Apellidos', minWidth: 170, align: 'center' },
    { id: 'tipo_documento', label: 'Tipo Documento', minWidth: 170, align: 'center' },
    { id: 'numero_documento', label: '# Documento', minWidth: 170, align: 'center' },
    { id: 'departamento', label: 'Departamento', minWidth: 170, align: 'center' },
    { id: 'Acciones', label: 'Acciones', minWidth: 100, align: 'center' },
  ];

  const rows = filteredEmployes.map((employee) => ({
    ...employee,
    tipo_documento: employee.tipo_documento?.nombre_tipo_documento,
    departamento: employee.departamento?.nombre_departamento,
    ciudad: employee.ciudad?.id_ciudad,
    Acciones: (
      <div className='OpcionesTable'>
        <Button 
          color='secondary' 
          onClick={() => openModal(            
            2, 
            employee.id_empleado, 
            employee.numero_documento, 
            employee.nombres_empleado, 
            employee.apellidos_empleado, 
            employee.ciudad.id_ciudad, 
            employee.direccion, 
            employee.email, 
            employee.telefono, 
            employee.fecha_hora_crear, 
            employee.fecha_hora_modificar, 
            employee.tipo_documento.id_tipo_documento, 
            employee.departamento.id_departamento)}
            data-bs-toggle="modal" 
            data-bs-target="#editarEmpleado"
          >
          Editar
        </Button>
        <Button 
          color='secondary' 
          onClick={() => openModal(
            2, 
            employee.id_empleado, 
            employee.numero_documento, 
            employee.nombres_empleado, 
            employee.apellidos_empleado, 
            employee.ciudad.nombre_ciudad, 
            employee.direccion, 
            employee.email,
            employee.telefono, 
            employee.fecha_hora_crear, 
            employee.fecha_hora_modificar, 
            employee.tipo_documento.nombre_tipo_documento, 
            employee.departamento.nombre_departamento)
          } 
          data-bs-toggle="modal" 
          data-bs-target="#verEmpleado"
        >
          Ver
        </Button>
        <Button color='secondary' onClick={() => handleDeleteEmployee(employee.id_empleado)}>
          Eliminar
        </Button>
      </div>
    ),
  }));

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 360 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column.id} align={column.align} className='tableHead'>
                    <div className="tableHead">
                      <strong className='cl_moradoOscuro'>{column.label}</strong>
                      {column.id !== 'Acciones' ? (
                      <input
                        type="text"
                        name={column.id}
                        value={searchFilters[column.id]}
                        onChange={handleFilterChange}
                        placeholder="Buscar"
                        className='inputSearch border_moradoOscuro'
                      />
                      ) : 
                      (
                      <Button 
                        color='secondary' 
                        onClick={() => openModal(1)} 
                        data-bs-toggle="modal" 
                        data-bs-target="#editarEmpleado"
                        style={{width:200}}
                      >
                        Nuevo Empleado
                      </Button>
                      )
                      }
                    </div>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id_empleado}>
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
                ))}
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
      {/* MODAL PARA VISUALIZAR */}
      <div className="modal fade" id="verEmpleado" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Detalles de {nombres_empleado} {apellidos_empleado}</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <ul>
                <li hidden>{id_empleado}</li>
                <li><strong className='cl_moradoOscuro'>Tipo de documento: </strong>{tipo_documento}</li>
                <li><strong className='cl_moradoOscuro'>Número de Documento: </strong>{numero_documento}</li>
                <li><strong className='cl_moradoOscuro'>Nombres: </strong>{nombres_empleado}</li>
                <li><strong className='cl_moradoOscuro'>Apellidos: </strong>{apellidos_empleado}</li>
                <li><strong className='cl_moradoOscuro'>Correo: </strong>{email}</li>
                <li><strong className='cl_moradoOscuro'>Departamento</strong>{departamento}</li>
                <li><strong className='cl_moradoOscuro'>Ciudad: </strong>{ciudad}</li>
                <li><strong className='cl_moradoOscuro'>Dirección: </strong>{direccion}</li>
                <li><strong className='cl_moradoOscuro'>Teléfono: </strong>{telefono}</li>
                <li><strong className='cl_moradoOscuro'>Fecha de creación: </strong>{fecha_hora_crear}</li>
              </ul>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
            </div>
          </div>
        </div>
      </div>
      {/* MODAL PARA EDITAR Y CREAR */}
      <div className="modal fade modal-lg" id="editarEmpleado" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">{nombres_empleado ? "Editar Empleado: " + nombres_empleado : "Nuevo Empleado"}</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <input hidden value={id_empleado} />
                <div class="input-group mb-3">
                <select class="form-select">
                  <option>Tipo de documento</option>
                    {
                      tipo_documentos.map((tipoDoc)=>(
                        <option selected={tipoDoc.id_tipo_documento==tipo_documento} value={tipoDoc.id_tipo_documento}>{tipoDoc.nombre_tipo_documento}</option>
                      ))
                    }
                </select>
                <input type="text" class="form-control" placeholder="Número de Documento" value={numero_documento} onChange={(e)=>{setNumero_documento(e.target.value)}}/>
                </div>
                <div class="input-group mb-3">
                  <span class="input-group-text"><i class="fa-solid fa-user me-2"></i>Nombres</span>
                  <input type="text" class="form-control" placeholder="Nombres" value={nombres_empleado} onChange={(e)=>{setNombres_empleado(e.target.value)}}/>
                  <input type="text" class="form-control" placeholder="Apellidos" value={apellidos_empleado} onChange={(e)=>{setApellidos_empleado(e.target.value)}}/>
                </div>
                <div class="input-group mb-3">
                  <span class="input-group-text"><i class="fa-solid fa-envelope me-2"></i>Correo</span>
                  <input type="email" class="form-control" placeholder="Correo elctrónico" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                  <span class="input-group-text"><i class="fa-solid fa-phone me-2"></i>Teléfono</span>
                  <input type="number" class="form-control" placeholder="Teléfono" value={telefono} onChange={(e)=>{setTelefono(e.target.value)}}/>
                </div>
                <div class="input-group mb-3">
                  <span class="input-group-text"><i class="fa-solid fa-compass me-2"></i>Departamento</span>
                  <select class="form-select" onBlur={(e) => handleDepartamentoChange(e.target.value)}>
                    <option>Departamento</option>
                      {
                        departamentos.map((dep)=>(
                          <option selected={dep.id==departamento} value={dep.id}>{dep.Departamento}</option>
                        ))
                      }
                  </select>
                  <select class="form-select" >
                    <option>Ciudad</option>
                    {ciudades.map((city) => (
                      <option key={city.id_ciudad} value={city.id_ciudad} selected={ciudad==city.id_ciudad}>
                        {city.nombre_ciudad}
                      </option>
                    ))}
                  </select>
                </div>
                <div class="input-group mb-3">
                  <span class="input-group-text"><i class="fa-solid fa-location-crosshairs me-2"></i>Dirección</span>
                  <input type="text" class="form-control" placeholder="Dirección" value={direccion} onChange={(e)=>{setDireccion(e.target.value)}}/>
                </div>
                <div class="input-group mb-3">
                  <span class="input-group-text"><i class="fa-solid fa-calendar-days me-2"></i></span>
                  <span class="input-group-text">Fecha creación</span>
                  <input type="date" class="form-control" value={ obtenerFecha(fecha_hora_crear)} onChange={(e)=>{setFecha_hora_crear(e.target.value)}}/>
                  <span class="input-group-text">Fecha actualización</span>
                  <input type="date" class="form-control" value={ obtenerFecha(fecha_hora_modificar)} onChange={(e)=>{setFecha_hora_modificar(e.target.value)}}/>
                </div>
              </form>
                    
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TableEmployes;
