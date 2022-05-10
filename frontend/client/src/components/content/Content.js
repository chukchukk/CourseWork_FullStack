import {Route, Routes} from "react-router-dom";
import LoginPage from "../auth/LoginPage";
import RegistrationPage from "../auth/RegistrationPage";
import ProjectList from "../project/ProjectList";

function Content() {
    return (
        <div>
            <Routes>
                <Route path="/login" element={<LoginPage />}/>
                <Route path="/registration" element={<RegistrationPage />} />
                <Route path="/projects" element={<ProjectList />} />
            </Routes>
        </div>
    )
}

export default Content;