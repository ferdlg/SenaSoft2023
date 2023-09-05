import "./index.css"

const Input = (props) =>{
    const placeholderModificado = `${props.placeholder}...`

    const manejarCambio = (e) => {
        props.actualizarValor(e.target.value)
    }

    const { type = "text" } = props

    return <div className={`campo campo-${type}`}>
        <label>{props.titulo}</label>
        <input 
            placeholder={placeholderModificado} 
            required={props.required}
            value={props.valor}
            onChange={manejarCambio}
            type={type}
        />
    </div>
}

export default Input;