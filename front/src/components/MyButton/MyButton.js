import "./index.css"
import {Button} from "@mui/material"

const MyButton = (props) => {
    return(
        <Button
            className="boton"
            startIcon={props.startIcon}
            endIcon={props.endIcon}
            variant={props.variant}
            onClick={props.onClick}
        >
            {props.children}
        </Button>
    )
    // <button 
    //     data-bs-toggle={props['data-bs-toggle']} 
    //     data-bs-target={props['data-bs-target']}
    //     className="boton">{props.children}
    // </button>;
}  

export default MyButton;