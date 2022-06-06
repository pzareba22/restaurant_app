import React from "react";
import { IDish, borderType, IUser } from "../constants/constants";
import { connect } from "react-redux";
import { addToBasket, removeDish, removeFromBasket } from "../actions";
import { Link } from "react-router-dom";
import "../styles/DishHolder.sass";
import axios from "axios";

interface IProps {
    dish: IDish;
    globalCountUpdater?: (diff: number) => void;
    borderStyle: borderType;
    addToBasket: (dish: IDish) => void;
    removeFromBasket: (dish: IDish) => void;
    removeDish: (dish: IDish) => void;
    id: number;
    sideClass: "left" | "right";
    amount: number;
    user: IUser;
    basket: any;
}

interface IState {
    imageNumber: number;
    amount: number;
    ordered: number;
}

class DishHolder extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        const basketAmount = props.basket.hasOwnProperty(props.dish.name)
            ? props.basket[props.dish.name].count
            : 0;

        this.state = {
            imageNumber: 0,
            amount: props.dish.dayAmount - basketAmount,
            ordered: this.props.amount,
        };
    }

    changeImage() {
        this.setState({
            imageNumber:
                (this.state.imageNumber + 1) % this.props.dish.images.length,
        });
    }

    updateAmount(diff: number) {
        this.setState({
            ordered: this.state.ordered + diff,
            amount: this.state.amount - diff,
        });
    }

    render(): React.ReactNode {
        const USDprice = Math.round((this.props.dish.price * 100) / 4) / 100;

        return (
            <div
                className={`dishHolder ${this.props.borderStyle} ${this.props.sideClass}`}
            >
                <div className="infoWrapper">
                    <h3 className={this.state.amount < 4 ? "orange" : ""}>
                        <Link to={`/dish/${this.props.id}`}>
                            {this.props.dish.name.toUpperCase()}
                        </Link>
                    </h3>
                    <p>Kuchnia: {this.props.dish.cuisine.toUpperCase()}</p>
                    <p id="price">Cena: {USDprice}$</p>
                    <p>Ilość dostępnych dań: {this.state.amount}</p>
                    {this.props.user.isManager && (
                        <div className="managerButtons">
                            <Link to={`/editDish/${this.props.id}`}>
                                <button>Edytuj</button>
                            </Link>
                            <button
                                onClick={(e) => {
                                    axios
                                        .delete(
                                            `http://localhost:3001/api/dishes/${this.props.dish._id}`,
                                            {
                                                headers: {
                                                    Authorization:
                                                        "Bearer " +
                                                        this.props.user.JWT,
                                                },
                                            }
                                        )
                                        .then(() =>
                                            this.props.removeDish(
                                                this.props.dish
                                            )
                                        );
                                }}
                            >
                                Usuń
                            </button>
                        </div>
                    )}
                </div>
                <div className="imgWrapper" onClick={() => this.changeImage()}>
                    <img
                        src={this.props.dish.images[this.state.imageNumber]}
                        alt={this.props.dish.name}
                    />
                </div>
                {this.props.user.JWT != "" && (
                    <div className="orderDetails">
                        <div className="buttonsWrapper">
                            <button
                                onClick={() => {
                                    this.updateAmount(1);
                                    this.props.addToBasket(this.props.dish);
                                }}
                                disabled={this.state.amount <= 0}
                            >
                                +
                            </button>
                            <button
                                onClick={() => {
                                    this.updateAmount(-1);
                                    this.props.removeFromBasket(
                                        this.props.dish
                                    );
                                }}
                                disabled={this.state.ordered <= 0}
                            >
                                -
                            </button>
                        </div>
                        <p id="ordered">
                            Zamówiona ilość: {this.state.ordered}
                        </p>
                    </div>
                )}
            </div>
        );
    }
}

const mapStateToProps = (state: any) => {
    return {
        user: state.user,
        basket: state.basket,
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        addToBasket: (dish: IDish) => dispatch(addToBasket(dish)),
        removeFromBasket: (dish: IDish) => dispatch(removeFromBasket(dish)),
        removeDish: (dish: IDish) => dispatch(removeDish(dish)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DishHolder);
