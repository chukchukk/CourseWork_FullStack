import {Route, Routes} from "react-router-dom";
import LoginPage from "../auth/LoginPage";
import RegistrationPage from "../auth/RegistrationPage";
import ProjectList from "../project/ProjectList";
import WorkSpace from "../workspace/WorkSpace";
import Orders from "../order/Orders";
import CreatedOrders from "../order/CreatedOrders";

function Content() {
    return (
        <div>
            <Routes>
                <Route path="/login" element={<LoginPage />}/>
                <Route path="/registration" element={<RegistrationPage />} />
                <Route path="/projects" element={<ProjectList />} />
                <Route path="/workSpace" element={<WorkSpace />} />
                <Route path="/orders" element={<Orders />} />
                <Route path={"/createdOrders"} element={<CreatedOrders />} />
            </Routes>
        </div>
    )
}

export default Content;