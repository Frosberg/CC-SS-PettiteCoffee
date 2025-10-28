import { Card } from "react-bootstrap";
import "./NotifyCard.css";

type Props = {
    title: string;
    description: string;
    date: string;
};

function NotifyCard({ title, description, date }: Props) {
    const dateLocal = new Date(date);
    const dateString = `${dateLocal.getDate()}/${
        dateLocal.getMonth() + 1
    }/${dateLocal.getFullYear()}`;
    const timeString = `${dateLocal.getHours()}:${dateLocal.getMinutes()}`;
    const dateTimeString = `${dateString} ${timeString}`;

    return (
        <Card>
            <Card.Header>{dateTimeString}</Card.Header>
            <Card.Body>
                <blockquote className="blockquote mb-0">
                    <p className="blackquote-title">{title}</p>
                    <footer className="blockquote-footer">{description}</footer>
                </blockquote>
            </Card.Body>
        </Card>
    );
}

export default NotifyCard;
