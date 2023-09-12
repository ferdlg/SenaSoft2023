import { Modal, Box } from "@mui/material";

const MyModal = ({ open, onClose, children }) => {
    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        boxShadow: 24,
    };
    return (
        <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
        <Box sx={modalStyle}>
            {children}
        </Box>
        </Modal>
    );
}

export default MyModal;