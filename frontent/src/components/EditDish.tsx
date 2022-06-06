import React, { useRef } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import "../styles/EditDish.sass";
import { Cuisine, IDish, DishCategory, DishType } from "../constants/constants";
import { updateDish } from "../actions";
import serialize from "form-serialize";
import axios from "axios";

interface IProps {
    dishes: Array<IDish>;
    updateDish: (dish: IDish) => any;
}

const EditDish: React.FC<IProps> = (props) => {
    const id = parseInt(useParams().dishID as string);
    const formRef = useRef<HTMLFormElement>(null);
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (formRef.current != null) {
            var data = serialize(formRef.current, { hash: true });
            console.log(data);

            data = {
                ...data,
                ingredients: (data.ingredients as string).split(" "),
                images: (data.images as string).split("\n"),
            };
            const dish: IDish = {
                name: data.name as string,
                cuisine: data.cuisine as Cuisine,
                type: data.dishType as DishType,
                category: data.dishCategory as DishCategory,
                ingredients: data.ingredients as Array<string>,
                dayAmount: parseInt(data.dayAmount as string),
                price: parseInt(data.price as string),
                description: data.description as string,
                images: data.images as Array<string>,
            };

            axios
                .put(
                    `http://localhost:3001/api/dishes/${props.dishes[id]._id}`,
                    dish
                )
                .then((res) => {
                    window.alert("pomyślnie zaktualizowano danie 😎");
                    console.log("updated :)");
                })
                .catch((err) => {
                    window.alert(
                        "nie udało się zakutalizować dania: " + err.message
                    );
                    console.log(err);
                });
            props.updateDish(dish);
        }
    };
    let dish: IDish | null = null;
    if (props.dishes.length >= id) {
        dish = props.dishes[id];
    }
    if (!dish) {
        return <div></div>;
    }
    return (
        <div className="editDish">
            <h1>Edytuj danie</h1>
            <form ref={formRef} onSubmit={handleSubmit}>
                <label>Nazwa</label>
                <input type="text" name="name" defaultValue={dish.name} />
                <label>Kuchnia</label>
                <select name="cuisine" id="" defaultValue={dish.cuisine}>
                    <option value="Polska">Polska</option>
                    <option value="Włoska">Włoska</option>
                    <option value="Indyjska">Indyjska</option>
                    <option value="Międzynarodowa">Międzynarodowa</option>
                    <option value="Francuska">Francuska</option>
                    <option value="Polska">Polska</option>
                </select>
                <label>Typ dania</label>
                <select name="dishType" defaultValue={dish.type}>
                    <option value="Mięsny">Mięsny</option>
                    <option value="Wegański">Wegański</option>
                </select>
                <label>Kategoria</label>
                <select name="dishCategory" defaultValue={dish.category}>
                    <option value="Zupa">Zupa</option>
                    <option value="Danie główne">Danie główne</option>
                    <option value="Sałatka">Sałatka</option>
                    <option value="Przystawka">Przystawka</option>
                    <option value="Kolacja">Kolacja</option>
                    <option value="Śniadanie">Śniadanie</option>
                </select>
                <label>Dzienna liczba</label>
                <input
                    type="number"
                    name="dayAmount"
                    defaultValue={dish.dayAmount}
                />
                <label>Cena</label>
                <input type="number" name="price" defaultValue={dish.price} />
                <label>Opis</label>
                <textarea
                    name="description"
                    defaultValue={dish.description}
                ></textarea>
                <label>Składniki (oddzielone spacją)</label>
                <textarea
                    name="ingredients"
                    defaultValue={dish.ingredients.join(" ")}
                ></textarea>
                <label>Obrazki (oddzielone spacją)</label>
                <textarea
                    name="images"
                    defaultValue={dish.images.join("\n")}
                    id="imagesArea"
                ></textarea>

                <input type="submit" />
            </form>
        </div>
    );
};

const mapStatetoProps = (state: any) => {
    return { dishes: state.dishes };
};

const mapDispatchToProps = (dispatch: any) => {
    return { updateDish: (dish: IDish) => dispatch(updateDish(dish)) };
};

export default connect(mapStatetoProps, mapDispatchToProps)(EditDish);
