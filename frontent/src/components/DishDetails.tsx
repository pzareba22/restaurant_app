import axios from "axios";
import React, { useState } from "react";
import { connect } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { removeDish } from "../actions";
import { IDish, IUser } from "../constants/constants";
import DishReviews from "./DishReviews";
import "../styles/DishDetails.sass";

interface IProps {
    dishes: Array<IDish>;
    user: IUser;
    removeDish: (dish: IDish) => void;
}

const DishDetails: React.FC<IProps> = (props) => {
    const id = parseInt(useParams().dishID as string);
    const [imgId, setImgId] = useState(0);
    const navigate = useNavigate();
    let dish: IDish | null = null;
    if (props.dishes.length >= id) {
        dish = props.dishes[id];
    }
    if (!dish) {
        return <div></div>;
    }

    return (
        <div className="dishDetails">
            <h1>{dish.name}</h1>
            <div
                className="imgWrapper"
                onClick={(e) => {
                    if (dish) setImgId((imgId + 1) % dish.images.length);
                }}
            >
                <img src={dish.images[imgId]} alt={dish.name} />
            </div>
            <div className="detailsWrapper">
                <p>{dish.description}</p>
                <h4>Kuchnia: {dish.cuisine}</h4>
                <h4>Typ: {dish.type}</h4>
                <h4>Kategoria: {dish.category}</h4>
                <h4>Składniki:</h4>
                <ul>
                    {dish.ingredients.map((ingredient, i) => {
                        return <li key={i}>{ingredient}</li>;
                    })}
                </ul>
                <h4>Dziennie do wydania: {dish.dayAmount}</h4>
                <h4>Cena: {Math.round((dish.price * 100) / 4) / 100}$</h4>
            </div>
            <DishReviews dish={dish} />
            {props.user.isManager && (
                <button
                    onClick={() => {
                        if (dish) {
                            axios.delete(
                                `http://localhost:3001/api/dishes/${dish._id}`
                            );
                            props.removeDish(dish);
                            navigate("/menu");
                        }
                    }}
                >
                    USUŃ DANIE
                </button>
            )}
        </div>
    );
};

const mapStateToProps = (state: any) => {
    return { dishes: state.dishes, user: state.user };
};

const mapDispatchToProps = (dispatch: any) => {
    return { removeDish: (dish: IDish) => dispatch(removeDish(dish)) };
};

export default connect(mapStateToProps, mapDispatchToProps)(DishDetails);
