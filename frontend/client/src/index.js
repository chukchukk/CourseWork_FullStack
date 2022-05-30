import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import UserStore from "./store/UserStore";
import ProjectStore from "./store/ProjectStore";
import OrderStore from "./store/OrderStore";


const userStore = new UserStore()
const orderStore = new OrderStore()
const projectStore = new ProjectStore()

export const Context = createContext({userStore, projectStore, orderStore})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
        <Context.Provider value={{userStore: userStore, projectStore: projectStore, orderStore: orderStore}}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </Context.Provider>
);

reportWebVitals();
