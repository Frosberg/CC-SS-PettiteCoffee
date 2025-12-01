import StarRating from "./StarRating";
import "./Comment.css";

type Props = {
    avatar?: string;
    verified: boolean;
    author: string;
    description: string;
    rating: number;
};

function Comment({ author, verified, description, rating }: Props) {
    return (
        <div className="comment">
            <section className="comment__avatar">
                <span></span>
            </section>
            <section className="comment__content">
                <div className="comment__header">
                    <div>
                        <span>{author}</span>
                        {verified && (
                            <span className="verfied__badge">
                                <i className="fa-solid fa-star"></i>
                                Verificado
                            </span>
                        )}
                    </div>
                    <StarRating value={rating} readonly />
                </div>
                <p className="comment__description">{description}</p>
            </section>
        </div>
    );
}

export default Comment;
