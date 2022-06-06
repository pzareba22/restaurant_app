import React from "react";
import { IReview } from "../constants/constants";
import "../styles/Review.sass";

interface IProps {
    review: IReview;
    onDelete: () => void;
    canDelete: boolean;
}

const Review: React.FC<IProps> = (props) => {
    return (
        <div className="review">
            <div className="content">
                <h2>{props.review.username}</h2>
                <p>{props.review.content}</p>
                <h3>{props.review.grade}/10</h3>
            </div>
            {props.canDelete && <button onClick={props.onDelete}>Usuń</button>}
        </div>
    );
};

export default Review;
