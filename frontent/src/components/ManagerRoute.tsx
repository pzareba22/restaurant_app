import React from "react";
import { connect } from "react-redux";
import { IUser } from "../constants/constants";

interface IProps {
    user: IUser;
    children: any;
}

const AdminRoute: React.FC<IProps> = (props: IProps) => {
    return props.user.isManager ? props.children : <h1>Not allowed</h1>;
};

const mapStateToProps = (state: any) => {
    return {
        user: state.user,
    };
};

export default connect(mapStateToProps)(AdminRoute);
