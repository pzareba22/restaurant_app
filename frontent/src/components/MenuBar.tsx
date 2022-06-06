import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "../styles/MenuBar.sass";
import { IUser } from "../constants/constants";
import { clearBasket, logoutUser } from "../actions";

interface IProps {
    basketSize: number;
    user: IUser;
    logout: () => void;
    clearBasket: () => void;
}

const MenuBar: React.FC<IProps> = (props) => {
    return (
        <div className="menuBar">
            <Link to="/">
                <div className="logo">
                    <img src="/images/logo_mis.png" alt="" />
                </div>
            </Link>
            <div className="links">
                <div className="linkWrapper">
                    <Link to="/">
                        <p>Strona główna</p>
                    </Link>
                </div>
                <div className="linkWrapper">
                    <Link to="menu">
                        <p>Menu</p>
                    </Link>
                </div>
                {props.user.isManager && (
                    <div className="linkWrapper managerOption">
                        <Link to="add">
                            <p>Dodaj danie</p>
                        </Link>
                    </div>
                )}
                {props.user.isAdmin && (
                    <div className="linkWrapper adminOption">
                        <Link to="admin">
                            <p>Zarządzaj uzytkownikami</p>
                        </Link>
                    </div>
                )}
                {props.user.JWT != "" && (
                    <div className="linkWrapper">
                        <Link to="basket">Koszyk ({props.basketSize})</Link>
                    </div>
                )}
            </div>
            {props.user.JWT === "" && (
                <div className="userInfo">
                    <Link to="register">Zarejestruj się</Link>
                    <Link to="login">Zaloguj się</Link>
                </div>
            )}
            {props.user.JWT != "" && (
                <div className="userInfo">
                    <div className="iconWrapper">
                        <img src="/images/user_icon.jpg" alt="" />
                    </div>
                    <div className="username">
                        <p>{props.user.username}</p>
                    </div>
                    <div
                        className="logout"
                        onClick={() => {
                            props.logout();
                            props.clearBasket();
                        }}
                    >
                        Wyloguj
                    </div>
                </div>
            )}
        </div>
    );
};

const mapStateToProps = (state: any) => {
    return {
        basketSize: state.basket.size,
        user: state.user,
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        logout: () => dispatch(logoutUser()),
        clearBasket: () => dispatch(clearBasket()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuBar);
