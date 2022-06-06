import React, { useRef } from "react";
import axios from "axios";
import serialize from "form-serialize";
import { IUser } from "../constants/constants";
import "../styles/UserHolder.sass";

interface IProps {
    user: IUser;
    loggedInUser: IUser;
}

const UserHolder: React.FC<IProps> = ({ user, loggedInUser }) => {
    const formRef = useRef<HTMLFormElement>(null);
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (formRef.current != null) {
            const data = serialize(formRef.current, { hash: true });

            const userData = {
                username: user.username,
                isBanned: data.isBanned === "tak" ? true : false,
                isAdmin: data.role === "administrator" ? true : false,
                isManager:
                    data.role === "menadzer" || data.role === "administrator"
                        ? true
                        : false,
            };

            axios
                .put(`http://localhost:3001/api/users/${user._id}`, userData, {
                    headers: { Authorization: "Bearer " + loggedInUser.JWT },
                })
                .then((res) => window.alert("pomyślnie zaktualizowano"))
                .catch((err) => window.alert("nie udało się zaktualizować"));
        }
    };
    return (
        <div className="userHolder">
            <h3>{user.username}</h3>
            <form ref={formRef} onSubmit={onSubmit}>
                <label>Banicja</label>
                <select
                    name="isBanned"
                    defaultValue={user.isBanned ? "tak" : "nie"}
                >
                    <option value="tak">tak</option>
                    <option value="nie">nie</option>
                </select>
                <label>Rola</label>
                <select
                    name="role"
                    defaultValue={
                        user.isAdmin
                            ? "administrator"
                            : user.isManager
                            ? "menadzer"
                            : "uzytkownik"
                    }
                >
                    <option value="administrator">administrator</option>
                    <option value="menadzer">menadzer</option>
                    <option value="uzytkownik">uzytkownik</option>
                </select>
                <input type="submit" value="Zmień" />
            </form>
        </div>
    );
};

export default UserHolder;
