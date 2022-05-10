import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import UserStore from "./store/UserStore";
import ProjectStore from "./store/ProjectStore";


const userStore = new UserStore()
const projectStore = new ProjectStore()

export const Context = createContext({userStore, projectStore})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
        <Context.Provider value={{userStore: userStore, projectStore: projectStore}}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </Context.Provider>
);

reportWebVitals();
