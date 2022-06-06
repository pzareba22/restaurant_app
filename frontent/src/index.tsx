import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";
import Dishes from "./components/Dishes";
import HomePage from "./components/HomePage";
import AddDish from "./components/AddDish";
import axios from "axios";
import DishDetails from "./components/DishDetails";
import EditDish from "./components/EditDish";
import Basket from "./components/Basket";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import AdminPanel from "./components/AdminPanel";
import AdminRoute from "./components/AdminRoute";
import ManagerRoute from "./components/ManagerRoute";

const store = createStore(reducers, applyMiddleware(thunk));

axios
    .get("http://localhost:3001/api/dishes")
    .then((res) => store.dispatch({ type: "FETCH_DISHES", payload: res.data }))
    .catch((err) => console.error(err));

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route path="/" element={<Navigate to="home" />} />
                    <Route path="home" element={<HomePage />} />
                    <Route path="menu" element={<Dishes />} />
                    <Route
                        path="add"
                        element={
                            <ManagerRoute>
                                <AddDish />
                            </ManagerRoute>
                        }
                    />
                    <Route path="dish">
                        <Route path=":dishID" element={<DishDetails />} />
                    </Route>
                    <Route path="editDish">
                        <Route
                            path=":dishID"
                            element={
                                <ManagerRoute>
                                    <EditDish />
                                </ManagerRoute>
                            }
                        />
                    </Route>
                    <Route path="basket" element={<Basket />} />
                    <Route path="login" element={<LoginPage />} />
                    <Route path="register" element={<RegisterPage />} />
                    <Route
                        path="admin"
                        element={
                            <AdminRoute>
                                <AdminPanel />
                            </AdminRoute>
                        }
                    />
                </Route>
            </Routes>
        </Router>
    </Provider>,
    document.querySelector("#root")
);
