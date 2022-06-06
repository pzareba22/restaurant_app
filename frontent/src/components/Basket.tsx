import axios from "axios";
import React from "react";
import { connect } from "react-redux";
import {
    addOrder,
    addToBasket,
    clearBasket,
    removeFromBasket,
} from "../actions";
import { IDish, IOrder, IUser } from "../constants/constants";
import "../styles/Basket.sass";

interface IProps {
    basket: any;
    user: IUser;
    addToBasket: (dish: IDish) => void;
    removeFromBasket: (dish: IDish) => void;
    clearBasket: () => void;
    addOrder: (order: IOrder) => void;
}

const plnToUSD = (price: number) => {
    const ratio = 4;
    return Math.round((price * 100) / ratio) / 100;
};

const Basket: React.FC<IProps> = (props) => {
    if (Object.entries(props.basket).length === 1) {
        return (
            <div className="basket">
                <h2 style={{ color: "#fff" }}>Koszyk jest pusty</h2>
            </div>
        );
    }

    const onOrder = () => {
        let errors = 0;
        Object.entries(props.basket).forEach(([key, value]: Array<any>, i) => {
            if (key !== "size") {
                const data = {
                    dishID: value.dish._id,
                    amount: value.count,
                };

                axios
                    .post(
                        `http://localhost:3001/api/orders/${props.user.username}`,
                        data,
                        {
                            headers: {
                                Authorization: "Bearer " + props.user.JWT,
                            },
                        }
                    )
                    .then((res) => {
                        const order: IOrder = {
                            ...data,
                            username: props.user.username,
                        };
                        props.addOrder(order);
                        props.clearBasket();
                    })
                    .catch((err) => {
                        window.alert("nie udało sie złozyć zamówienia: " + err);
                        errors++;
                    });
            }
        });
        if (errors === 0) window.alert("zamówienie złozone pomyślnie");
    };

    return (
        <div className="basket">
            {Object.entries(props.basket).map(([key, value]: Array<any>, i) => {
                if (key !== "size") {
                    return (
                        <div className="basketEntry" key={i}>
                            <div className="imageWrapper">
                                <img src={value.dish.images[0]} alt="" />
                            </div>
                            <h4>
                                {key}: {value.count} (
                                {plnToUSD(value.dish.price * value.count)}$ )
                            </h4>
                            <div className="buttons">
                                <button
                                    onClick={() => {
                                        props.addToBasket(value.dish);
                                    }}
                                >
                                    +
                                </button>
                                <button
                                    onClick={() => {
                                        props.removeFromBasket(value.dish);
                                    }}
                                >
                                    -
                                </button>
                            </div>
                        </div>
                    );
                }
            })}
            <button onClick={onOrder} id="orderButton">
                Zamów
            </button>
        </div>
    );
};

const mapStateToProps = (state: any) => {
    return { basket: state.basket, user: state.user };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        addToBasket: (dish: IDish) => dispatch(addToBasket(dish)),
        removeFromBasket: (dish: IDish) => dispatch(removeFromBasket(dish)),
        clearBasket: () => dispatch(clearBasket()),
        addOrder: (order: IOrder) => dispatch(addOrder(order)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Basket);
