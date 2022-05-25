import {createRoot} from "react-dom/client";
import SnackbarComponent from "./SnackbarComponent";

function SnackbarConstructor(alertContainerName, type, message) {
    const alertContainer = document.getElementById(alertContainerName);
    const root = createRoot(alertContainer);
    root.render(
        <SnackbarComponent type={type} message={message}/>
    );
}

export default SnackbarConstructor;