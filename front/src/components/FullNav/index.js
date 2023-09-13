import { useState, Fragment } from "react";
import { Link } from "react-router-dom";
import { AccountCircle, Logout } from "@mui/icons-material"
import { Container, Box, IconButton, Menu, MenuItem, Divider, Avatar, ListItemIcon } from "@mui/material";
import Title from "../Title";
import "./FullNav.css"

const FullNav = () =>{
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    return(
        <div className="bg_moradoOscuro navSuperior">
            <Container className="cl_blanco fullNav">
                <Title text="SenaSoft"/>
                <div>
                    <Link to="/" className="cl_blanco">Empleados</Link>
                    <Fragment>
                    <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                        <IconButton
                            onClick={handleClick}
                            size="small"
                            sx={{ ml: 2 }}
                            aria-controls={open ? 'account-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                        >
                            <AccountCircle fontSize="large" color="active" className="cl_blanco"/>
                        </IconButton>
                    </Box>
                    <Menu
                        anchorEl={anchorEl}
                        id="account-menu"
                        open={open}
                        onClose={handleClose}
                        onClick={handleClose}
                        PaperProps={{
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                            },
                            '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                            },
                        },
                        }}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >
                        <MenuItem onClick={handleClose}>
                        <Link className="linkPerfil" to="/Account">
                            <Avatar /> Perfil
                        </Link>
                        </MenuItem>
                        <Divider />
                        <MenuItem onClick={handleClose}>
                        <Link className="linkPerfil" to="/login">
                            <Logout fontSize="small" />
                        </Link>
                        Logout
                        </MenuItem>
                    </Menu>
                    </Fragment>
                </div>
            </Container>
        </div>
    )
}

export default FullNav;