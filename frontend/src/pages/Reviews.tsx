import { useState } from "react";
import StarRating from "../components/StarRating";
import Layout from "./Layout";
import "./Reviews.css";
import Comment from "../components/Comment";

function Reviews() {
    const [, setScore] = useState(0);

    return (
        <Layout className="wrapper">
            <div className="wrapper__container">
                <h2 className="wrapper__title">Reseñas</h2>

                <section className="reviews">
                    <form className="reviews__form" action="" noValidate>
                        <section className="form__avatar">
                            <span></span>
                        </section>
                        <section className="form__content">
                            <div className="form__content-section">
                                <div className="input">
                                    <label htmlFor="names">Nombre y Apellido:</label>
                                    <input type="text" placeholder="ej. Juan Pablo" id="names" />
                                </div>

                                <div className="input">
                                    <label htmlFor="email">Correo Electrónico:</label>
                                    <input
                                        type="email"
                                        placeholder="ej. juanpablo@gmail.com"
                                        id="email"
                                    />
                                </div>
                            </div>
                            <textarea placeholder="Escribe tu reseña..." id=""></textarea>
                            <div className="form__content-actions">
                                <div>
                                    <span>Tu Puntuación: </span>
                                    <StarRating onChange={(v) => setScore(v)} />
                                </div>
                                <button>
                                    ENVIAR RESEÑA
                                    <i className="fa-solid fa-chevron-right"></i>
                                </button>
                            </div>
                        </section>
                    </form>

                    <Comment
                        author="the markillo"
                        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl eu ultrices ultricies, nunc nisi aliquam ante, euismod aliquet nisl nunc euismod. Aliquam erat volutpat. Nunc id semper nisi. Nullam id dolor id nibh ultricies euismod."
                        rating={5}
                    />

                    <Comment
                        author="the markillo"
                        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl eu ultrices ultricies, nunc nisi aliquam ante, euismod aliquet nisl nunc euismod. Aliquam erat volutpat. Nunc id semper nisi. Nullam id dolor id nibh ultricies euismod."
                        rating={5}
                    />
                    <Comment
                        author="the markillo"
                        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl eu ultrices ultricies, nunc nisi aliquam ante, euismod aliquet nisl nunc euismod. Aliquam erat volutpat. Nunc id semper nisi. Nullam id dolor id nibh ultricies euismod."
                        rating={5}
                    />
                    <Comment
                        author="the markillo"
                        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl eu ultrices ultricies, nunc nisi aliquam ante, euismod aliquet nisl nunc euismod. Aliquam erat volutpat. Nunc id semper nisi. Nullam id dolor id nibh ultricies euismod."
                        rating={5}
                    />
                    <Comment
                        author="the markillo"
                        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl eu ultrices ultricies, nunc nisi aliquam ante, euismod aliquet nisl nunc euismod. Aliquam erat volutpat. Nunc id semper nisi. Nullam id dolor id nibh ultricies euismod."
                        rating={5}
                    />
                    <Comment
                        author="the markillo"
                        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl eu ultrices ultricies, nunc nisi aliquam ante, euismod aliquet nisl nunc euismod. Aliquam erat volutpat. Nunc id semper nisi. Nullam id dolor id nibh ultricies euismod."
                        rating={5}
                    />
                </section>
            </div>
        </Layout>
    );
}

export default Reviews;
