import React, { useRef } from "react";
import { connect } from "react-redux";
import { addDish } from "../actions";
import serialize from "form-serialize";
import "../styles/AddDish.sass";
import { Cuisine, IDish, DishCategory, DishType } from "../constants/constants";
import axios from "axios";

const AddDish: React.FC = (props: any) => {
    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (formRef.current != null) {
            let data = serialize(formRef.current, { hash: true });
            try {
                data = {
                    ...data,
                    ingredients: (data.ingredients as string).split(" "),
                    images: (data.images as string).split(""),
                };
            } catch (error) {
                window.alert("Proszę wypełnić wszystkie pola");
            }
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
                .post("http://localhost:3001/api/dishes", dish)
                .then((res) => {
                    if (res.status == 200) {
                        window.alert("Pomyślnie dodano danie");
                    }
                })
                .catch((err) => {
                    window.alert("Nie udało się dodać dania: " + err.message);
                    console.log("error adding a dish");
                });
            props.addDish(dish);
        }
    };
    const formRef = useRef<HTMLFormElement>(null);

    return (
        <div className="addDish">
            <h1>Dodaj Danie</h1>
            <form ref={formRef} onSubmit={submit}>
                <label>Nazwa</label>
                <input type="text" name="name" />
                <label>Kuchnia</label>
                <select name="cuisine" id="">
                    <option value="Polska">Polska</option>
                    <option value="Włoska">Włoska</option>
                    <option value="Indyjska">Indyjska</option>
                    <option value="Międzynarodowa">Międzynarodowa</option>
                    <option value="Francuska">Francuska</option>
                    <option value="Polska">Polska</option>
                </select>
                <label>Typ dania</label>
                <select name="dishType">
                    <option value="Mięsny">Mięsny</option>
                    <option value="Wegański">Wegański</option>
                </select>
                <label>Kategoria</label>
                <select name="dishCategory">
                    <option value="Zupa">Zupa</option>
                    <option value="Danie główne">Danie główne</option>
                    <option value="Sałatka">Sałatka</option>
                    <option value="Przystawka">Przystawka</option>
                    <option value="Kolacja">Kolacja</option>
                    <option value="Śniadanie">Śniadanie</option>
                </select>
                <label>Dzienna liczba</label>
                <input type="number" name="dayAmount" />
                <label>Cena</label>
                <input type="number" name="price" />
                <label>Opis</label>
                <textarea name="description"></textarea>
                <label>Składniki (oddzielone spacją)</label>
                <textarea name="ingredients"></textarea>
                <label>Obrazki (oddzielone spacją)</label>
                <textarea name="images"></textarea>

                <input type="submit" />
            </form>
        </div>
    );
};

const mapDispatchToProps = (dispatch: any) => {
    return { addDish: (dish: IDish) => dispatch(addDish(dish)) };
};

export default connect(null, mapDispatchToProps)(AddDish);
