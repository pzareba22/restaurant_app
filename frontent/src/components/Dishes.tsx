import React, { useState } from "react";
import DishHolder from "./DishHolder";
import { borderType, IDish } from "../constants/constants";
import { connect } from "react-redux";
import { removeDish } from "../actions";
import "../styles/Dishes.sass";

const Dishes: React.FC = (props: any) => {
    const [len, setLen] = useState(props.dishes.length);
    const [page, setPage] = useState(0);

    if (props.dishes.length === 0) {
        return <div>Loading...</div>;
    }

    if (len === 0) {
        setLen(props.dishes.length);
    }

    const n = props.dishes.length;
    if (page > Math.floor(n / len)) {
        setPage(0);
    }

    var maxDish = props.dishes[0];
    var minDish = props.dishes[0];
    props.dishes.forEach((dish: IDish) => {
        if (dish.price > maxDish.price) {
            maxDish = dish;
        } else if (dish.price < minDish.price) {
            minDish = dish;
        }
    });

    const getContent = () => {
        const n = props.dishes.length;
        const numPages = Math.ceil(n / len);
        const numItems = Math.round(n / numPages);
        const startIndex = page * len;
        const endIndex = Math.min(startIndex + len, n);
        const res = [];
        for (let i = startIndex; i < endIndex; i++) {
            const dish = props.dishes[i];
            const side = (i - startIndex) % 2 === 0 ? "left" : "right";
            var borderStyle: borderType = "";
            if (dish === maxDish) {
                borderStyle = "max";
            } else if (dish === minDish) {
                borderStyle = "min";
            }

            let amount = 0;
            if (props.basket.hasOwnProperty(dish.name)) {
                amount = props.basket[dish.name].count;
            }

            res.push(
                <DishHolder
                    dish={dish}
                    key={i}
                    id={i}
                    borderStyle={borderStyle}
                    sideClass={side}
                    amount={amount}
                />
            );
        }
        return res;
    };

    const getNavButtons = () => {
        if (n === 0 || len === 0) {
            return;
        }
        const numPages = Math.ceil(n / len);
        const res = [];
        for (let i = 0; i < numPages; i++) {
            res.push(
                <button
                    key={i}
                    onClick={() => {
                        setPage(i);
                        window.scrollTo(0, 0);
                    }}
                >
                    {i + 1}
                </button>
            );
        }

        return res;
    };

    getNavButtons();

    return (
        <div className="dishesWrapper">
            {props.user.JWT != "" && (
                <div
                    className={
                        "dishesInfo " +
                        (props.basket.size >= 10 ? "blue" : "orange")
                    }
                >
                    <p>
                        Liczba zamówionych dań:{" "}
                        <span id="size">{props.basket.size}</span>
                    </p>
                </div>
            )}
            <div className="dishes">{getContent().map((el: any) => el)}</div>

            <footer>
                <div className="pageNav">
                    {getNavButtons()?.map((el) => el)}
                </div>
                <form
                    onSubmit={(e: any) => {
                        e.preventDefault();
                        setLen(e.target.lastChild.valueAsNumber);
                    }}
                >
                    <label>liczba elementów na stronę: </label>
                    <input
                        type="number"
                        defaultValue={len}
                        min={1}
                        max={props.dishes.length}
                    />
                </form>
            </footer>
        </div>
    );
};

const mapStateToProps = (state: any) => {
    return { dishes: state.dishes, basket: state.basket, user: state.user };
};

const mapDispatchToProps = (dispatch: any) => {
    return { removeDish: (dish: IDish) => dispatch(removeDish(dish)) };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dishes);
