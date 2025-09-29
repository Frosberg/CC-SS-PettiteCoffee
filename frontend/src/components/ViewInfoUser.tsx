import "./ViewInfoUser.css";

interface ViewInfoUserProps {
    title: string;
    value: string | null;
}

function ViewInfoUser({ title, value }: ViewInfoUserProps) {
    return (
        <div className="perfil__content__data__item">
            <h4 className="perfil__content__data__item-title">{title}</h4>
            <p className="perfil__content__data__item-value">{value}</p>
        </div>
    );
}

export default ViewInfoUser;
