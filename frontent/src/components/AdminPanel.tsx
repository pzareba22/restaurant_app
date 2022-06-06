import React, { useEffect, useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import "../styles/AdminPanel.sass";
import { IUser } from "../constants/constants";
import UserHolder from "./UserHolder";

interface IProps {
    loggedInUser: IUser;
}

const AdminPanel: React.FC<IProps> = ({ loggedInUser }) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:3001/api/users", {
                headers: { Authorization: "Bearer " + loggedInUser.JWT },
            })
            .then((res) => {
                setUsers(res.data);
                console.log(res.data);
            });
    }, []);

    return (
        <div className="adminPanel">
            {users.map((user: IUser, i) => {
                return (
                    <UserHolder
                        user={user}
                        loggedInUser={loggedInUser}
                        key={i}
                    />
                );
            })}
        </div>
    );
};

const mapStateToProps = (state: any) => {
    return {
        loggedInUser: state.user,
    };
};

export default connect(mapStateToProps)(AdminPanel);
