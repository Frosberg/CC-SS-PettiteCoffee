import { useEffect, useState, type FormEvent } from "react";
import StarRating from "../components/StarRating";
import Layout from "./Layout";
import "./Reviews.css";
import Comment from "../components/Comment";
import AuthStore from "../stores/AuthStore";
import { RequestAddReview, RequestAddReviewGuest, RequestReviews } from "../api/ReviewsApi";

function Reviews() {
    const isAuth = AuthStore((state) => state.isAuth);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [body, setBody] = useState("");
    const [score, setScore] = useState(0);

    const [reviews, setReviews] = useState<Review[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const loadReviews = async () => {
        setIsLoading(true);
        const res = await RequestReviews();
        if (res.ok && res.data) setReviews(res.data);
        setIsLoading(false);
    };

    useEffect(() => {
        void loadReviews();
    }, []);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isSubmitting) return;

        if (!body.trim()) {
            alert("Por favor escribe tu reseña.");
            return;
        }
        if (score <= 0) {
            alert("Por favor selecciona una puntuación.");
            return;
        }

        setIsSubmitting(true);

        const isGuest = !isAuth;

        const res = isGuest
            ? await RequestAddReviewGuest({
                  nombre: name.trim() || "Invitado",
                  email: email.trim(),
                  cuerpo: body.trim(),
                  puntuacion: score,
              })
            : await RequestAddReview({
                  cuerpo: body.trim(),
                  puntuacion: score,
              });

        if (!res.ok) {
            alert(res.message ?? "Ocurrió un error al enviar la reseña.");
            setIsSubmitting(false);
            return;
        }

        setBody("");
        setScore(0);
        if (isGuest) {
            setName("");
            setEmail("");
        }

        await loadReviews();
        setIsSubmitting(false);
        alert("¡Gracias por tu reseña!");
    };

    return (
        <Layout className="wrapper">
            <div className="wrapper__container">
                <h2 className="wrapper__title">Reseñas</h2>

                <section className="reviews">
                    <form className="reviews__form" onSubmit={handleSubmit} noValidate>
                        <section className="form__avatar">
                            <span></span>
                        </section>
                        <section className="form__content">
                            {!isAuth && (
                                <div className="form__content-section">
                                    <div className="input">
                                        <label htmlFor="names">Nombre y Apellido:</label>
                                        <input
                                            type="text"
                                            placeholder="ej. Juan Pablo"
                                            id="names"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </div>

                                    <div className="input">
                                        <label htmlFor="email">Correo Electrónico:</label>
                                        <input
                                            type="email"
                                            placeholder="ej. juanpablo@gmail.com"
                                            id="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                </div>
                            )}

                            <textarea
                                placeholder="Escribe tu reseña..."
                                value={body}
                                onChange={(e) => setBody(e.target.value)}
                            ></textarea>
                            <div className="form__content-actions">
                                <div>
                                    <span>Tu Puntuación: </span>
                                    <StarRating value={score} onChange={(v) => setScore(v)} />
                                </div>
                                <button type="submit" disabled={isSubmitting}>
                                    {isSubmitting ? "ENVIANDO..." : "ENVIAR RESEÑA"}
                                    <i className="fa-solid fa-chevron-right"></i>
                                </button>
                            </div>
                        </section>
                    </form>

                    {isLoading && <p>Cargando reseñas...</p>}
                    {!isLoading && reviews.length === 0 && (
                        <p>Aún no hay reseñas. ¡Sí el primero en opinar!</p>
                    )}
                    {!isLoading &&
                        reviews.map((review) => (
                            <Comment
                                key={
                                    review.idReview ??
                                    `${review.nombre}-${review.cuerpo}-${review.puntuacion}`
                                }
                                author={review.email}
                                description={review.cuerpo}
                                rating={review.puntuacion}
                            />
                        ))}
                </section>
            </div>
        </Layout>
    );
}

export default Reviews;
