import StarRating from "./StarRating";
import "./Comment.css";

type Props = {
    avatar?: string;
    author: string;
    description: string;
    rating: number;
};

function Comment({ author, description, rating }: Props) {
    return (
        <div className="comment">
            <section className="comment__avatar">
                <span></span>
            </section>
            <section className="comment__content">
                <div className="comment__header">
                    <span>{author}</span>
                    <StarRating value={rating} readonly />
                </div>
                <p className="comment__description">{description}</p>
            </section>
        </div>
    );
}

export default Comment;
