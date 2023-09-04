import "./index.css"

const Button = (props) => {
    return <button 
        data-bs-toggle={props['data-bs-toggle']} 
        data-bs-target={props['data-bs-target']}
        className="boton">{props.children}
    </button>;
}  

export default Button;