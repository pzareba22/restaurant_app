import React, { useRef } from "react";
import axios from "axios";
import serialize from "form-serialize";
import "../styles/RegisterPage.sass";
import { useNavigate } from "react-router-dom";

const RegisterPage: React.FC = () => {
    const formRef = useRef<HTMLFormElement>(null);

    const navigate = useNavigate();

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (formRef.current != null) {
            const data = serialize(formRef.current, { hash: true });
            console.log(data);
            if (data.password != data.password2) {
                window.alert("Hasła się nie zgadzają");
                return;
            }

            const user = {
                username: data.username,
                password: data.password,
            };

            axios
                .post("http://localhost:3001/api/users/register", user)
                .then((res) => {
                    window.alert("Pomyślnie zarejestrowano uzytkownika");
                    navigate("/home");
                })
                .catch((err) =>
                    window.alert("Nie udało się dodać uzytkownika: " + err)
                );
        }
    };

    return (
        <div className="registerPage">
            <h1>Rejestracja</h1>
            <form ref={formRef} onSubmit={onSubmit}>
                <div className="inputGroup">
                    <label>Nazwa uzytkownika</label>
                    <input type="text" name="username" />
                </div>
                <div className="inputGroup">
                    <label>Hasło</label>
                    <input type="password" name="password" />
                </div>
                <div className="inputGroup">
                    <label>Powtórz hasło</label>
                    <input type="password" name="password2" />
                </div>
                <input type="submit" value="Zarejestruj się" />
            </form>
        </div>
    );
};

export default RegisterPage;
