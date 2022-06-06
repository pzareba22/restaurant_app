import React, { useRef } from "react";
import axios from "axios";
import { connect } from "react-redux";
import serialize from "form-serialize";
import "../styles/LoginPage.sass";
import { IUser } from "../constants/constants";
import { loginUser } from "../actions";
import { useNavigate } from "react-router-dom";

interface IProps {
    loginUser: (user: IUser) => void;
}

const LoginPage: React.FC<IProps> = (props) => {
    const formRef = useRef<HTMLFormElement>(null);
    const navigate = useNavigate();

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (formRef.current != null) {
            const data = serialize(formRef.current, { hash: true });

            axios
                .post("http://localhost:3001/api/users/login", data)
                .then((res) => {
                    if (res.status === 200) {
                        console.log(res.data.accessToken);
                        const user: IUser = {
                            username: data.username as string,
                            isAdmin: res.data.isAdmin,
                            isManager: res.data.isManager,
                            JWT: res.data.accessToken,
                            isBanned: res.data.isBanned,
                            reviews: res.data.reviews,
                            orders: res.data.orders,
                        };

                        console.log("user orders: ");
                        console.log(user.orders);

                        props.loginUser(user);
                    }
                    navigate("/home");
                })
                .catch((err) => {
                    if (err.response.status == 403) {
                        window.alert("Niepoprawny login / hasło");
                    } else {
                        window.alert("Błąd logowania: " + err);
                    }
                });
        }
    };

    return (
        <div className="loginPage">
            <form ref={formRef} onSubmit={onSubmit}>
                <div className="inputGroup">
                    <label>Nazwa uzytkownika</label>
                    <input type="text" name="username" />
                </div>
                <div className="inputGroup">
                    <label>Hasło</label>
                    <input type="password" name="password" />
                </div>
                <input type="submit" value="Zaloguj się" />
            </form>
        </div>
    );
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        loginUser: (user: IUser) => dispatch(loginUser(user)),
    };
};

export default connect(null, mapDispatchToProps)(LoginPage);
