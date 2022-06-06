import React from "react";
import { Outlet } from "react-router-dom";
import MenuBar from "./MenuBar";
import "../styles/App.sass";

const App: React.FC<{}> = () => {
    return (
        <div className="app">
            <MenuBar />
            <div className="content">
                <Outlet />
            </div>
        </div>
    );
};

export default App;
