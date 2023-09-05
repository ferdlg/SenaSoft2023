import Button from "../Button/Button";
import Modal from "../Modal/Modal";
import FormEmployes from '../FormEmployes/FormEmployes';
import "./index.css"

const Employes = () =>{
    return <div className="DivEmployes">
        <div className="EmployesTitle">
          <h1>Empleados</h1>
          <Button data-bs-toggle="modal" data-bs-target="#staticBackdrop">Nuevo Empleado +</Button>
        </div>
        <Modal title="Nuevo Empleado" optionName="Agregar Empleado">
          <FormEmployes/>
        </Modal>
        
    </div>
}   

export default Employes;