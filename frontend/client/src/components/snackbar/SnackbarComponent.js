import {Alert, Snackbar} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import {useState} from "react";
import * as React from 'react';

function SnackbarComponent(props) {
    const [isOpen, setOpen] = useState(true)

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    return (
        <Snackbar open={isOpen} autoHideDuration={3000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={props.type} sx={{width: '100%'}}>
                {props.message}
            </Alert>
        </Snackbar>
    )
}

export default SnackbarComponent;