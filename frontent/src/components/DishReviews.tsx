import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { IDish, IReview, IUser } from "../constants/constants";
import { connect } from "react-redux";
import serialize from "form-serialize";
import Review from "./Review";
import "../styles/DishReviews.sass";

interface IProps {
    dish: IDish;
    user: IUser;
}

const DishReviews: React.FC<IProps> = ({ dish, user }) => {
    const [reviews, setReviews] = useState<Array<IReview>>([]);
    const formRef = useRef<HTMLFormElement>(null);

    const onDelete = (id: number) => {
        console.log("deleting");

        axios
            .delete(`http://localhost:3001/api/reviews/${id}`, {
                headers: { Authorization: "Bearer " + user.JWT },
            })
            .then((res) => {
                setReviews(reviews.filter((r) => r._id != id));
            })
            .catch((err) => window.alert("Błąd usuwania recenzji: " + err));
    };

    useEffect(() => {
        axios
            .get(`http://localhost:3001/api/reviews/${dish._id}`)
            .then((res) => {
                setReviews(res.data);
            })
            .catch((err) => console.log(err));
    }, []);

    const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (formRef.current != null) {
            let data = serialize(formRef.current, { hash: true });
            const review: IReview = {
                username: data.user as string,
                content: data.content as string,
                grade: parseInt(data.grade as string),
                dishID: parseInt(data.dishID as string),
            };
            try {
                axios
                    .post(
                        `http://localhost:3001/api/reviews/${dish._id}`,
                        review,
                        { headers: { Authorization: "Bearer " + user.JWT } }
                    )
                    .then((res) => {
                        if (res.status === 200) {
                            window.alert("Recenzja została dodana🥳");
                        }
                    })
                    .catch((err) => {
                        window.alert(
                            "Nie udało się dodać recenzji: " + err.error
                        );
                    });
                setReviews([review, ...reviews]);
            } catch (error) {
                window.alert("Proszę wypełnić wszystkie pola");
            }
        }
    };

    const canReview =
        reviews.filter((r) => r.username === user.username).length === 0 &&
        user.orders.filter((o) => o.dishID === dish._id).length > 0 &&
        !user.isBanned;

    return (
        <div className="reviews">
            <h1>Opinie</h1>
            {reviews.map((review, i) => {
                return (
                    <Review
                        review={review}
                        key={i}
                        onDelete={() => onDelete(review._id as number)}
                        canDelete={
                            review.username == user.username || user.isAdmin
                        }
                    />
                );
            })}

            {canReview && (
                <div className="reviewHolder">
                    <h1>Dodaj recenzję</h1>
                    <form id="reviewForm" ref={formRef} onSubmit={onFormSubmit}>
                        <label>Nazwa uzytkownika</label>
                        <input
                            type="text"
                            name="user"
                            value={user.username}
                            readOnly
                        />
                        <label>Opinia</label>
                        <textarea name="content"></textarea>
                        <label>Ocena</label>
                        <input type="number" name="grade" min={0} max={10} />
                        <input type="submit" value="Dodaj recenzję" />
                    </form>
                </div>
            )}
        </div>
    );
};

const mapStateAsProps = (state: any) => {
    return {
        user: state.user,
    };
};

export default connect(mapStateAsProps)(DishReviews);
