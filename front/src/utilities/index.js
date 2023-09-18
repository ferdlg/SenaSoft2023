import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

export function show_alert(msg, icon, foco='') {
    onfocus(foco);
    const MySwal = withReactContent(Swal);
    MySwal.fire({
        title:msg,
        icon:icon
    });
}

function onfocus(foco){
    if(foco!==''){
        document.getElementById(foco).focus();
    }
}

export function obtenerFecha (isoDatetime) {
    const dateObject = new Date(isoDatetime);
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, '0');
    const day = String(dateObject.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}